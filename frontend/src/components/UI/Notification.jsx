import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../features/ui/uiSlice";

function Notification() {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!notification) return null;

  let style = {};

  if (notification.status === "pending") {
    style = { color: "blue" };
  }

  if (notification.status === "success") {
    style = { color: "green" };
  }

  if (notification.status === "error") {
    style = { color: "red" };
  }

  return (
    <div style={style}>
      <p>{notification.message}</p>
    </div>
  );
}

export default Notification;
