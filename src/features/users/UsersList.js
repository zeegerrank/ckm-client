import { Card, Container, Table } from "react-bootstrap";
import { useGetUsersQuery } from "./usersApiSlice";
import Users from "./User";
const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids.map((userId) => (
      <Users key={userId} userId={userId} />
    ));

    content = (
      <Container>
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Users List</Card.Title>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created date</th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return content;
};
export default UsersList;
