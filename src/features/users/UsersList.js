import { Card, Container, Table } from "react-bootstrap";const UsersList = () => {
  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Users List</Card.Title>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created date</th>
              </tr>
            </thead>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default UsersList;
