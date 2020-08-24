import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ReactMarkdown from "react-markdown";

import Toast from "../../components/Toast";
import CreateModal from "./CreateModal";
import DetailsModal from "./DetailsModal";
import "./index.css";

import { fetchOpinions, logout } from "../../store/actions";

const Feed = () => {
  const dispatch = useDispatch();
  const opinions = useSelector((state) => state.opinions);
  const opinion = useSelector((state) => state.createOpinion);
  const [opinionsIds, setOpinionsIds] = useState([]);
  const [search, setSearch] = useState("");
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detailsOpinionId, setDetailsOpinionId] = useState();

  const ids = opinions?.ids;
  const content = opinions?.content;

  useEffect(() => {
    dispatch(fetchOpinions());
  }, [dispatch]);

  useEffect(() => {
    opinions?.ids && setOpinionsIds(opinions.ids);
  }, [opinions]);

  useEffect(() => {
    opinion?.id && setCreateModalVisible(false);
  }, [opinion]);

  useEffect(() => {
    if (ids?.length) {
      search.length
        ? setOpinionsIds(
            ids.filter((opinionId) =>
              content[opinionId].title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
          )
        : setOpinionsIds(ids);
    }
  }, [search, content, ids]);

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
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <Button onClick={() => setCreateModalVisible(true)}>
            Nova opinião
          </Button>
        </div>
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
                  <div
                    style={{
                      color: "#28a745",
                      fontWeight: "bold",
                    }}
                  >
                    ({opinions.content[opinionId].upvotes_count}) Votos
                  </div>
                </Card.Title>
                <Card.Text>
                  <div className="opinion-description">
                    <div className="shadow"></div>
                    <ReactMarkdown
                      source={opinions.content[opinionId].content}
                    />
                  </div>
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="link"
                    onClick={() => {
                      setDetailsModalVisible(true);
                      setDetailsOpinionId(opinionId);
                    }}
                  >
                    Exibir Detalhes
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
      <CreateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
      <DetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        opinionId={detailsOpinionId}
      />
    </div>
  );
};

export default Feed;
