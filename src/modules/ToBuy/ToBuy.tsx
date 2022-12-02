import React,{useEffect,useState,useMemo,ReactNode} from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { IToBuy } from '../../store/reducers/ToBuySlice';
import { AppColors } from '../../styles/global';
import { StyledBody } from './ToBuyStyles';

const ToBuy = () => {

    const {list}: IToBuy = useAppSelector((state)=>state.toBuyReducer);
    const dispatch = useAppDispatch();
    
    const toBuyList = useMemo(()=>{
        return list.map((listItem: any,i:number):ReactNode =>{
            const {img_link,name,current_prices,store_name} = listItem;
            return (
            <tr className="d-flex w-100 h-100" key={`listItem${i}`} style={{color:"white",fontSize:".7em"}}>
                    <td>{i+1}</td>
                    <td>{name}</td>
                    <td>{current_prices.price_reg__min}</td>
                    <td>{current_prices.price_promo__min}</td>
                    {/* <td>{store_name}</td> */}
                    <td><img src={img_link} alt="product_image" style={{width:"50px",height:"50px",borderRadius:"8px"}}/></td>
            </tr>
            )
        })
    },[list])

    return (
        <div>
            {
                list?.length > 0 ?
            <Table>
            <StyledBody style={{backgroundColor:AppColors.gray}}>
            {toBuyList}

                </StyledBody>
            </Table>
            :
            <p style={{color:AppColors.cream}}>Список покупок пуст</p>
            }
        </div>
    )
}

export default ToBuy;