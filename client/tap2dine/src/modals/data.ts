import AddCategory from "./category/add-category-modal";

type TModalData = {
    [key in TModalKeys]:{
        title:string;
        component:React.FC
    }
}
export type TModalKeys = 'ADD_CATEGORY';

export const ModalData:TModalData = {
    ADD_CATEGORY:{
        title:"Add Category",
        component:AddCategory
    },
}