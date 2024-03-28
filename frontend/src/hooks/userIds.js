import { useSelector } from "react-redux";

export function useIds() {
    const { collections, itemIds } = useSelector(state => state.ids)

    return {
        collections,
        itemIds
    }
};