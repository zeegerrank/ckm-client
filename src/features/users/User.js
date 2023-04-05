import { memo } from "react";import { useGetUsersQuery } from "./usersApiSlice";
const User = ({ userId }) => {
  let content;
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data.entities[userId],
    }),
  });

  if (user) {
    const userRolesString = user.roles?.join(", ");
    console.log(typeof user.createdAt);

    return (content = (
      <tr>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{userRolesString}</td>
        <td>{user.createdAt?.replaceAll("T", " T")}</td>
      </tr>
    ));
  }

  return content;
};

const memoizedUser = memo(User);

export default memoizedUser;
