import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ReactMarkdown from "react-markdown";

import Toast from "../../components/Toast";
import "./index.css";

import {
  fetchOpinions,
  insertUpvote,
  deleteUpvote,
  fetchOpinion,
  logout,
} from "../../store/actions";

const Feed = () => {
  const dispatch = useDispatch();
  const opinions = useSelector((state) => state.opinions);
  const [opinionsIds, setOpinionsIds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchOpinions());
  }, []);

  useEffect(() => {
    opinions?.ids && setOpinionsIds(opinions.ids);
  }, [opinions]);

  useEffect(() => {
    if (opinions?.ids?.length) {
      search.length
        ? setOpinionsIds(
            opinions.ids.filter((opinionId) =>
              opinions.content[opinionId].title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
          )
        : setOpinionsIds(opinions.ids);
    }
  }, [search]);

  return (
    <div style={{ position: "relative" }}>
      <Toast
        message={opinions?.error?.message}
        status={opinions?.error?.status}
      />
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Feed de Opiniões</h1>
          <Button onClick={() => dispatch(logout())}>Log Out</Button>
        </div>
        <hr />
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="Buscar pelo título"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        <hr />
        {opinions?.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner
              style={{ marginRight: "5px" }}
              animation="border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          opinionsIds.map((opinionId) => (
            <Card key={opinionId} style={{ marginBottom: "15px" }}>
              <Card.Body>
                <Card.Title
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{opinions.content[opinionId].title}</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        marginRight: "15px",
                        color: "#28a745",
                        fontWeight: "bold",
                      }}
                    >
                      ({opinions.content[opinionId].upvotes_count}) Votos
                    </div>
                    {opinions.content[opinionId].has_voted ? (
                      <Button
                        onClick={() => dispatch(deleteUpvote(opinionId))}
                        variant="danger"
                      >
                        Remover
                      </Button>
                    ) : (
                      <Button
                        onClick={() => dispatch(insertUpvote(opinionId))}
                        variant="success"
                      >
                        Votar
                      </Button>
                    )}
                  </div>
                </Card.Title>
                <Card.Text>
                  <div class="text">
                    <div class="shadow"></div>
                    <ReactMarkdown
                      source={opinions.content[opinionId].content}
                    />
                  </div>
                  <Button
                    style={{ marginTop: "10px" }}
                    onClick={() => dispatch(fetchOpinion(opinionId))}
                  >
                    Detalhes
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
};

export default Feed;
