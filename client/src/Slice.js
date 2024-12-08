import { createSlice } from '@reduxjs/toolkit'
const Clientdata = createSlice({
    name: 'BcData',
    initialState: {
        Data: [],
        AB: [],
        TB: [],
        AU: [],
        // Drafts:[],
        
    },
    reducers: {
        CldataAdd: (state, action) => {
            console.log("Logdata--", action.payload);
            state.Data.push(action.payload)
            // state.Drafts=action.payload.drafts

        },
        CldataRemove: (state, action) => {

            state.Data = []
            state.AB = []
            state.AU = []
            state.TB = []
            state.Drafts = []

        },
        ClABAdd: (state, action) => {
            console.log("Blogdata--", action.payload);
            state.AB = action.payload

        },
        ClTBAdd: (state, action) => {
            console.log("TrendBlogdata--", action.payload);
            state.TB = action.payload
            state.TB.splice(5);

        },
        ClAUAdd: (state, action) => {
            console.log("AllUserdata--", action.payload);
            state.AU = action.payload

        },
        ClBRu: (state, action) => {
            console.log("BlogReadadddata--", action.payload);
            state.AB.map((ab) => {
                if (ab._id === action.payload._id) {
                    ab.treads = action.payload.treads
                }
            })
        },
        ClBLu: (state, action) => {
            console.log("BlogReadadddata--", action.payload);
            state.AB.map((ab) => {
                if (ab._id === action.payload._id) {
                    ab.tlikes = action.payload.tlikes
                }
            })
        },
        ClLPu: (state, action) => {
            console.log("BlogReadadddata--", action.payload);
           
                state.Data[0].likedpost.push(action.payload)
                    
                
           
        },
        ClLPr: (state, action) => {
            console.log("BlogReadadddata--", action.payload);
           
            state.Data[0].likedpost = state.Data[0].likedpost.filter(postId => postId !== action.payload);
                    
                
           
        },
        ClBCu: (state, action) => {
            console.log("Blogcommadddata--", action.payload);
            state.AB.map((ab) => {
                if (ab._id === action.payload._id) {
                    ab.comments = action.payload.comments
                }
            })
        },
        // Cldru: (state, action) => {
        //     console.log("BlogDraftadddata--", action.payload);
            
        //     state.Drafts=[...action.payload]
        
        // },
        // Cldrr: (state, action) => {
        //     console.log("BlogDraftremovedata--", action.payload);
        //     // state.Data[0].drafts=action.payload
        // },

        ClBup: (state, action) => {
            console.log("BlogUpdatedata--", action.payload);
            const index = state.AB.findIndex(blog => blog._id === action.payload._id);
            if (index !== -1) {
                state.AB = [
                    ...state.AB.slice(0, index),
                    action.payload,
                    ...state.AB.slice(index + 1)
                ];
            }
        },

    }
})

export const { CldataAdd, CldataRemove, ClABAdd, ClTBAdd, ClAUAdd, ClBRu, ClBup, Cldru,ClLPu ,ClLPr,Cldrr,ClBCu} = Clientdata.actions
export default Clientdata.reducer