const router = require('express').Router()
const ClData=require('../models/user')
const Bdata=require('../models/blog')
const multer=require('multer')
const Crypto=require('crypto-js')
const jwt=require('jsonwebtoken')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/Images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/Clip",upload.single('image'), async (req, res) => {
    console.log("auth data==> ",req.body);
    console.log("image",req.file);
    try {
        req.body.password = Crypto.AES.encrypt(req.body.password, process.env.CryptKey).toString()
        const newData = new ClData({
            username: req.body.username,
            email: req.body.email,
            image: req.file.originalname,
            password: req.body.password,
            drafts: [],
        })
        const saveData = await newData.save()
        res.status(200).json(saveData)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post('/Clverify', async (req, res) => {
    console.log("ver test", req.body);
    try {
        const Dbd = await ClData.findOne({ email: req.body.emaillog })
        console.log("Dbd---", Dbd);
        !Dbd && res.status(401).json('Please check your email')

        const Hp = Crypto.AES.decrypt(Dbd.password, process.env.CryptKey)
        const Op = Hp.toString(Crypto.enc.Utf8)
        console.log("Dbd password", Op);
        console.log("password vercheck==", Op, req.body.passwordlog);
        Op != req.body.passwordlog && res.status(401).json('Password and email are not match')

        const accesstoken = jwt.sign({
            id: Dbd._id
        }, process.env.JwtKey, { expiresIn: '1d' })

        console.log("accesstoken--", accesstoken);
        const { password, ...others } = Dbd._doc
        res.status(200).json({ ...others, accesstoken, Op })


    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/Udel/:id', async (req, res) => {
    console.log("del",req.params.id);
    try {
        const user1 = await ClData.findById(req.params.id);
        console.log("user1",user1);
        await ClData.findByIdAndDelete(req.params.id)
        console.log("delllllll");
        await Bdata.deleteMany({ user: user1.username });

        res.status(200).json('Deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

const storageB = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/BannerImg')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploadB = multer({ storage: storageB })

const conditionalUpload = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
        uploadB.single('image')(req, res, next);
    } else {
        next();
    }
};


router.post("/BlCreate",uploadB.single('image'), async (req, res) => {
    console.log("auth data==> ",req.body);
    // console.log("image",req.file);
    // const btagArray = JSON.parse(req.body.btag);
    try {
        const UpdateData = { ...req.body }
        const btagArray = JSON.parse(req.body.btag);
        // UpdateData.btag=btagArray
        if (req.file) {
            console.log('enterd if');
            UpdateData.image = req.file.originalname;
            
        }
        const newData = new Bdata({
            btitle: req.body.btitle,
            bdes: req.body.bdes,
            image: UpdateData.image,
            btag: btagArray,
            user:req.body.buser,
            userimage:req.body.buserimg,
            userFullname:req.body.buserFullname,
            date:req.body.date,
            treads:req.body.treads,
            tlikes:req.body.tlikes,
            tcomments:req.body.tcomments,
            tparentcomments:req.body.tparentcomments,
            
        })
        const saveData = await newData.save()
        res.status(200).json(saveData)
    } catch (err) {
        res.status(500).json(err)
    }
})



router.post('/Blupdate/:id',conditionalUpload , async (req, res) => {
    console.log("req body----", req.body); 
    console.log("req body-image---", req.body.image); 
    console.log("id", req.params.id);

   

    try {
        const UpdateData = { ...req.body }
        const btagArray = JSON.parse(req.body.btag);
        UpdateData.btag=btagArray
        
         
          if (req.file) {
            console.log('enterd if');
            UpdateData.image = req.file.originalname;
        }
      
        console.log('before updated===', UpdateData);
        const updateuser = await Bdata.findByIdAndUpdate(req.params.id, {
            $set: UpdateData
        }, { new: true }
        )
        console.log("upuser", updateuser);
        res.status(200).json(updateuser)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/getAllBlog', async (req, res) => {
    try {
        const AllBData = await Bdata.find()
        res.status(200).json(AllBData)

    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/getTrendBlog', async (req, res) => {
    try {
        const TrBData = await Bdata.find().sort({ treads: -1, tlikes: -1 }).exec();
        res.status(200).json(TrBData)

    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/getAllUsers', async (req, res) => {
    try {
        const AllUData = await ClData.find()
        res.status(200).json(AllUData)

    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/ReadAdd/:id', async (req, res) => {
    console.log("read id data",req.params.id,req.body.data);
    try {
        const Bl = await Bdata.findByIdAndUpdate(req.params.id, {
            $set: { treads:req.body.data}
        }, { new: true }
        )
        res.status(200).json(Bl)


    } catch (err) {
        res.status(500).json(err)

    }
})
router.put('/LikeAdd/:id', async (req, res) => {
    console.log("la id data",req.params.id,req.body.data);
    try {
        const Bl = await Bdata.findByIdAndUpdate(req.params.id, {
            $set: { tlikes:req.body.data}
        }, { new: true }
        )
        res.status(200).json(Bl)


    } catch (err) {
        res.status(500).json(err)

    }
})
router.put('/LikedPostAdd/:id', async (req, res) => {
    console.log("lpa id data",req.params.id,req.body.data);
    try {
        const Cl = await ClData.findByIdAndUpdate(req.params.id, {
            $push: { likedpost:req.body.data}
        }, { new: true }
        )
        res.status(200).json(Cl)


    } catch (err) {
        res.status(500).json(err)

    }
})
router.put('/LikedPostRemove/:id', async (req, res) => {
    console.log("lpr id data",req.params.id,req.body.data);
    try {
        const Cl = await ClData.findByIdAndUpdate(req.params.id, {
            $pull: { likedpost: req.body.data }
        }, { new: true }
        )
        res.status(200).json(Cl)


    } catch (err) {
        res.status(500).json(err)

    }
})

router.delete('/Bdel/:id', async (req, res) => {
    console.log("del",req.params.id);
    try {
       
        await Bdata.findByIdAndDelete(req.params.id)
        console.log("delllllll");

        res.status(200).json('Blog Deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/comAdd/:id', async (req, res) => {
    console.log("comm id data",req.params.id,req.body.data);
    try {
        const comment = {
            comment: req.body.data,
            commentreply: [] 
        };

        const blogPost = await Bdata.findById(req.params.id);
        if (!blogPost) {
            throw new Error('Blog post not found');
        }

        blogPost.comments.push(comment);
        await blogPost.save();
        res.status(200).json(blogPost)


    } catch (err) {
        res.status(500).json(err)

    }
})

// router.put('/draftAdd/:id',uploadB.single('image'), async (req, res) => {
//     console.log("id data",req.params.id,req.body);
//     const UpdateData = { ...req.body }
//         const btagArray = JSON.parse(req.body.btag);
//         UpdateData.btag=btagArray
    
//         const drAr = {
//             btitle: UpdateData.btitle,
//             bdes: UpdateData.bdes,
//             btag: UpdateData.btag,
//             image: req.file.originalname
//         };
//     console.log("drar",drAr);

//     try {
//         const Dr = await ClData.findByIdAndUpdate(req.params.id, {
//             $push: { drafts: drAr }
//         }, { new: true }
//         )
//         console.log("DR===>",Dr.drafts);
//         res.status(200).json(Dr.drafts)


//     } catch (err) {
//         res.status(500).json(err)

//     }
// })

// router.put('/remd/:id', async (req, res) => {
//     console.log("del",req.params.id);
//     console.log("body=>>",req.body.btitle);
//     try {
//         // const user1 = await ClData.findById(req.params.id);
//         const user = await ClData.findById(req.params.Id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         // const initialDraftCount = user.drafts.length;
//         user.drafts = user.drafts.filter(draft => draft.btitle !== btitle);
//         // if (user.drafts.length === initialDraftCount) {
//         //     return res.status(404).json({ message: 'Draft not found' });
//         // }

//         await user.save();

//         res.status(200).json('Deleted')
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })


module.exports = router
