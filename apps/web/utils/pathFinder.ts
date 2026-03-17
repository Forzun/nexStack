
export const pathFinder = (pathname: string) => {
    const pathArray = pathname.split("/");

    if (pathArray.length == 3) {
        return pathArray[2];
    }

    return pathArray[1];
}


