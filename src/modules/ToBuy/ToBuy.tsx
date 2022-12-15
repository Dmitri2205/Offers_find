import React, {
  useEffect,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
import { Table, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { IToBuy, toBuySlice } from "../../store/reducers/ToBuySlice";
import { AppColors } from "../../styles/global";
import { StyledBody } from "./ToBuyStyles";

const ToBuy = () => {
  const { removeToBuy } = toBuySlice.actions;

  const { list }: IToBuy = useAppSelector((state) => state.toBuyReducer);
  const dispatch = useAppDispatch();

  const countControlHandler = (type: string, index: number) => {
    const newList = [...list];
    switch (type) {
      case "remove":
        newList.splice(index, 1);
        dispatch(removeToBuy(newList));
        break;
      case "add":
        console.log(`add item ${list[index]}`);
        break;
    }
  };

  const toBuyList = useMemo(() => {
    const item = (product: any, i: number) => {
      const { listItem, itemsCount } = product;
      const { img_link, name, current_prices, store_name } = listItem;
      return (
        <tr
          className="d-flex w-100 h-100"
          key={`listItem${i}`}
          style={{ color: "white", fontSize: ".7em" }}
        >
          <td>
            <div className="countControl">
              <span onClick={(e) => countControlHandler("remove", i)}>-</span>
              <span>{itemsCount}</span>
              <span onClick={(e) => countControlHandler("add", i)}>+</span>
            </div>
          </td>
          <td>{name}</td>
          <td>{current_prices.price_reg__min}</td>
          <td>{current_prices.price_promo__min}</td>
          {/* <td>{store_name}</td> */}
          <td>
            <img
              src={img_link}
              alt="product_image"
              style={{ width: "50px", height: "50px", borderRadius: "8px" }}
            />
          </td>
        </tr>
      );
    };

    const result: Array<any> = [];
    list.forEach((listItem: any, index): void => {
      const isAdded = list.filter((_) => _.name === listItem.name);
      const isInList = result.find((_) => _.listItem.name === listItem.name);
      const itemsCount = isAdded.length;
      !isInList ? result.push({ listItem, itemsCount, index }) : null;
    });
    return result.map((product, i) => {
      return item(product, i);
    });
  }, [list]);

  return (
    <div className="px-2">
      {list?.length > 0 ? (
        <Table>
          <StyledBody style={{ backgroundColor: AppColors.gray }}>
            {toBuyList}
          </StyledBody>
        </Table>
      ) : (
        <p style={{ color: AppColors.cream }}>Список покупок пуст</p>
      )}
    </div>
  );
};

export default ToBuy;
