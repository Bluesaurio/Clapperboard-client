import { useState } from "react";
import service from "../services/config";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//Bootstrap
import { Container, Form, Button } from "react-bootstrap";

function AddList(props) {
  const params = useParams();
  console.log(params.userId);
  const redirect = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Custom");

  const handleListName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customList = { name, description, category };
    console.log(customList);

    try {
      const response = await service.post(`/profile/lists`, customList);
      props.getData();
      console.log(response);
    } catch (error) {
      console.log(error);
      redirect("/error");
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    backgroundColor: "grey",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <div>
      <Container className="text-center" style={containerStyle}>
        <h4>Create your lists</h4>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formListName">
            <Form.Label>Give a name to your list</Form.Label>
            <Form.Control type="text" value={name} onChange={handleListName} />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>What's your list about?</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={handleDescription}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>What type of list is it?</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={handleCategory}
            >
              <option value="Custom">Custom</option>
              <option value="Favorites">Favorites</option>
              <option value="Watchlist">Watchlist</option>
            </Form.Control>
          </Form.Group>
          <br />
          <Button
            variant="light"
            type="submit"
            style={{ backgroundColor: "#fdb14d" }}
          >
            Create
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddList;
