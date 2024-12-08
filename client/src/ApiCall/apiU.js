import { publicRequest, userRequest } from "../Rqst/request";
import { CldataAdd, ClABAdd, ClTBAdd, ClAUAdd, ClBRu, ClBup, CldataRemove, Cldru, Cldrr, ClLPu, ClLPr, ClBCu } from "../Slice";


export const Signin = async (data) => {
    console.log('data--', data);
    try {

        const response = await publicRequest.post("/Blog1/Clip", data)
        console.log("success", response);
    } catch (err) {
        console.log('error--', err);
    }
}

export const LoginF = async (dispatch, data) => {
    console.log('data Login--', data);
    try {

        const response = await publicRequest.post("/Blog1/Clverify", data)

        console.log("success", response);

        dispatch(CldataAdd(response.data))

    } catch (err) {
        console.log('error--', err);
    }
}

export const DelAcc = async (id,nav,dispatch) => {
    console.log("dataaaa---",id);
    try {
        await userRequest.delete(`/Blog1/Udel/${id}`)
        dispatch(CldataRemove())
        nav('/')
    } catch (err) {
        console.log('error--', err);
    }
}

export const CreateBlog = async (data,nav) => {
    console.log('data opp--', data);
    try {

        const response = await publicRequest.post("/Blog1/BlCreate", data)
        console.log("success", response);
        nav('/')


    } catch (err) {
        console.log('error--', err);
    }
}

export const UpdateBlog = async (data, id, nav, disp) => {
    console.log("Updated fn--", data, "id--", id);
    try {

        const updat = await userRequest.post(`/Blog1/Blupdate/${id}`, data)
        console.log("update data finished", updat);
        disp(ClBup(updat));
        nav('/')


    } catch (err) {
        console.log('error--', err);
    }
}

export const DelBlog = async (id,nav,dispatch) => {
    console.log("dataaaa---",id);
    try {
        await userRequest.delete(`/Blog1/Bdel/${id}`)
        // dispatch(CldataRemove())
        nav('/')
    } catch (err) {
        console.log('error--', err);
    }
}

export const GetBlogAll = async (dispatch) => {
    try {
        const AllB = await publicRequest.get("/Blog1/getAllBlog")
        console.log("AllB", AllB);
        dispatch(ClABAdd(AllB.data))

    } catch (err) {
        console.log('error--', err);

    }
}

export const GetBlogTrend = async (dispatch) => {

    try {
        const TrB = await publicRequest.get("/Blog1/getTrendBlog")
        console.log("AllB", TrB);
        dispatch(ClTBAdd(TrB.data))

    } catch (err) {
        console.log('error--', err);

    }
}
export const GetUserAll = async (dispatch) => {
    try {
        const AllU = await publicRequest.get("/Blog1/getAllUsers")
        console.log("AllB", AllU);
        dispatch(ClAUAdd(AllU.data))

    } catch (err) {
        console.log('error--', err);

    }
}

export const AddR = async (tre, id, disp) => {
    console.log("Updated fn--", tre, "id--", id);
    try {

        const updat = await userRequest.put(`/Blog1/ReadAdd/${id}`, { data: tre })
        console.log("update data", updat);
        disp(ClBRu(updat.data))

    } catch (err) {
        console.log('error--', err);
    }
}
export const AddL = async (tre, id, disp) => {
    console.log("Updated fn--", tre, "id--", id);
    try {

        const updat = await userRequest.put(`/Blog1/LikeAdd/${id}`, { data: tre })
        console.log("update data", updat);
        // disp(ClBRu(updat.data))

    } catch (err) {
        console.log('error--', err);
    }
}
export const AddLP = async (tre, id, disp) => {
    console.log("Updated fn--", tre, "id--", id);
    try {

        const updat = await userRequest.put(`/Blog1/LikedPostAdd/${id}`, { data: tre })
        console.log("update data", updat);
        disp(ClLPu(tre))

    } catch (err) {
        console.log('error--', err);
    }
}
export const RemLP = async (tre, id, disp) => {
    console.log("Updated fn--", tre, "id--", id);
    try {

        const updat = await userRequest.put(`/Blog1/LikedPostAdd/${id}`, { data: tre })
        console.log("update data", updat);
        disp(ClLPr(tre))

    } catch (err) {
        console.log('error--', err);
    }
}
export const Adddraft = async (dd,id,disp) => {
    console.log("dd--",dd);
    try {

        const updat = await userRequest.put(`/Blog1/draftAdd/${id}`, dd)
        console.log("update data", updat.data);
        disp(Cldru(updat.data))

    } catch (err) {
        console.log('error--', err);
    }
}
export const RemDraft = async (bt,id,disp) => {
    console.log("dd--",bt);
    try {

        const updat = await userRequest.put(`/Blog1/remd/${id}`, bt)
        console.log("update rem data", updat);
        // disp(Cldrr(updat.data.drafts))

    } catch (err) {
        console.log('error--', err);
    }
}
export const AddComment = async ( id,c,disp) => {
    console.log("comment add--", c, "id--", id);
    try {

        const updat = await userRequest.put(`/Blog1/comAdd/${id}`, { data: c })
        console.log(" Comment added", updat);
    
        disp(ClBCu(updat.data))

    } catch (err) {
        console.log('error--', err);
    }
}




