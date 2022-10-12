import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-877a2-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error(`Couldn't fetch data.`);
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Couldnt fetch data.",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending!",
        message: "Data is being sent.",
      })
    );
    const sendData = async () => {
      const response = await fetch(
        "https://react-http-877a2-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("couldnt send data.");
      }
    };

    try {
      await sendData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Data sent successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Couldnt send data.",
        })
      );
    }
  };
};
