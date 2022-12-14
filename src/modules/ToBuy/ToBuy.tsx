import React,{useEffect,useState,useMemo,ReactNode} from "react";
import { Table, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { IToBuy } from '../../store/reducers/ToBuySlice';
import { AppColors } from '../../styles/global';
import { StyledBody } from './ToBuyStyles';

const ToBuy = () => {

    const {list}: IToBuy = useAppSelector((state)=>state.toBuyReducer);
    const dispatch = useAppDispatch();
    
    const toBuyList = useMemo(()=>{

        const item = (product: any,i: number) => {
            const {listItem,itemsCount} = product;
            const {img_link,name,current_prices,store_name} = listItem;
            return(
                    <tr className="d-flex w-100 h-100" key={`listItem${i}`} style={{color:"white",fontSize:".7em"}}>
                        <td>
                            <span>{itemsCount}</span> 
                            <Button>Убрать</Button> 
                        </td>
                        <td>{name}</td>
                        <td>{current_prices.price_reg__min}</td>
                        <td>{current_prices.price_promo__min}</td>
                        {/* <td>{store_name}</td> */}
                        <td><img src={img_link} alt="product_image" style={{width:"50px",height:"50px",borderRadius:"8px"}}/></td>
                </tr>
                )
        }

        const result: Array<any> = [];
        list.forEach((listItem: any):void =>{
            const isAdded = list.filter((_)=>_.name === listItem.name);
            const isInList = result.find((_)=>_.listItem.name === listItem.name);
            const itemsCount = isAdded.length;
            !isInList ? result.push({listItem,itemsCount}) : null
        })
        return result.map((product,i)=>{
            return item(product,i)
        });
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