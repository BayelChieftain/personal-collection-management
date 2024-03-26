import { useSelector } from "react-redux";

export function useIds() {
    const { collectionIds, itemIds } = useSelector(state => state.ids)

    return {
        collectionIds,
        itemIds
    }
};