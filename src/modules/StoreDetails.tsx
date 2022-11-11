import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { storesSlice } from "../store/reducers/StoresSlice";
import { storesList } from "./content/StoresList/StoresList";
import { api } from "@API";
import { DetailsWraper } from "@styles/DetailsStyles";
import * as moment from "moment";
import scrollHelper from "./scrollHelper";
import {
  Card,
  Button,
  ListGroup,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";

type offersType = {
  offers: any;
};

const StoreDetails = (props: any) => {
  const ItemsList = useRef(null);

  const [loading, isLoading] = useState<boolean>(false);
  const [storeIndex, setStoreIndex] = useState<number | null>(null);

  const { setStoreOffers } = storesSlice.actions;
  const { stores } = useAppSelector((state) => state.storesReducer);
  const dispatch = useAppDispatch();

  const params = useParams();
  moment.locale("ru");

  useEffect(() => {
    let currentStore: number = stores.findIndex(
      (store: storesList, i: number): boolean => {
        return store.sap_code === params.storeSap;
      }
    );
    setStoreIndex(currentStore);
    if (!stores[currentStore].offers) {
      isLoading(true);
      api
        .getItems(params.storeSap)
        .then((res: any) => {
          dispatch(
            setStoreOffers({ data: res.data.results, storeIndex: currentStore })
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  }, [stores]);

  const scrollHandler = (e: any): void => {
    scrollHelper(e);
  };

  useEffect(() => {
    if (!ItemsList) return;
    ItemsList.current.addEventListener("scroll", scrollHandler, false);
  }, [ItemsList]);

  const renderOffers = (): any => {
    let arr = [];
    if (stores[storeIndex] && stores[storeIndex].offers) {
      arr = stores[storeIndex].offers.map((offer: any, i: number) => {
        const { name, img_link, promo, current_prices } = offer;
        return (
          <Card className="CustomCard" key={`item${i}`}>
            <Card.Img variant="top" src={img_link} />
            <Card.Body>
              {name.length > 48 ? (
                <OverlayTrigger
                  trigger="click"
                  key={`top${i}`}
                  placement={"top"}
                  overlay={
                    <Popover id={"popover-positioned-top"}>
                      <Popover.Body>{name}</Popover.Body>
                    </Popover>
                  }
                >
                  <Card.Title>{name}</Card.Title>
                </OverlayTrigger>
              ) : (
                <Card.Title>{name}</Card.Title>
              )}
              <Card.Text>
                Акция закончится {moment().to(promo.date_end)}
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Цена по скидке: {current_prices.price_promo__min}
                </ListGroup.Item>
                <ListGroup.Item>
                  Цена без скидки: {current_prices.price_reg__min}
                </ListGroup.Item>
                <ListGroup.Item>
                  {"Экономим: " +
                    (
                      Number(current_prices.price_reg__min) -
                      Number(current_prices.price_promo__min)
                    ).toFixed(2) +
                    "₽"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        );
      });
      return arr;
    }
  };

  return (
    <DetailsWraper ref={ItemsList}>
      {loading ? (
        <Spinner animation="border" variant="info" />
      ) : !loading && stores[storeIndex]?.offers.length === 0 ? (
        <h4>Кажется, в этом магазине нет акционных товаров</h4>
      ) : (
        renderOffers()
      )}
    </DetailsWraper>
  );
};

export default StoreDetails;
