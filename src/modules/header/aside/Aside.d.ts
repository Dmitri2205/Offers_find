import React, { MutableRefObject } from "react";
interface AsideProps {
    menuOpened?: boolean;
    childRef?: MutableRefObject<HTMLDivElement>;
}
declare const Aside: React.FC<AsideProps>;
export default Aside;
