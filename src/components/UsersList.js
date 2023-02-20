import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

function UsersList() {
  // make tracking state by useState() instead of Redux
  // the piece of state to keep track of whether or not we are loading up the list of users
  // and if true the Skeleton Loader component will be shown
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // the piece of state to store errors
  // if an error with the request occurred this state will be updated with the error
  const [loadingUsersError, setLoadingUsersError] = useState(null);

  const dispatch = useDispatch();

  // const { isLoading, data, error } = useSelector((state) => {
  const { data } = useSelector((state) => {
    return state.users;
  });

  /*
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
   */

  useEffect(() => {
    setIsLoadingUsers(true);

    // by default dispatch returns a promise which doesn't follow the conventional rules
    // this promise.then() gets called whether the request succeeds OR FAILS (instead of promise.catch())
    dispatch(fetchUsers())
      .unwrap() // returns a brand new promise which follows the conventional rules
      // .then(() => setIsLoadingUsers(false))
      .catch((err) => {
        setLoadingUsersError(err);
        // setIsLoadingUsers(false);
      })
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);


  const handleUserAdd = () => {
    dispatch(addUser());
  };

  // if (isLoading) {
  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }
  // if (error) {
  if (loadingUsersError) {
    return <div>Error fetching data</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
