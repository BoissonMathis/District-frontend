import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


let currentPage: string = "home"

export const currentPage$ = new BehaviorSubject(currentPage)

export const setCurrentPage = async (page: string) => {
    currentPage = page
    return currentPage$.next(currentPage)
}

export const useCurrentPage = () => {
    const [currentPage, setCurrentPage] = useState<string>('');
    const location = useLocation()

    useEffect(() => {
        const subscription = currentPage$.subscribe((page) => setCurrentPage(page))
        return () => {
            subscription.unsubscribe();
        };
    }, [])

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location])

    return currentPage
}
