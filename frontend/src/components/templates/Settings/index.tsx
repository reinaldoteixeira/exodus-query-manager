import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";

import api from "../../../services/api";

import PageTitle from "../../elements/PageTitle/PageTitle";
import Panel from "../../elements/Panel/Panel";
import Loader from "../../elements/Loader";
import BreadCrumb from "../../elements/Breadcrumb";

import { Container } from "./styles";
import { ConfigType } from "../../../@types";

const Settings: React.FC = () => {
  const [config, setConfig] = useState({} as ConfigType);
  const [statusColor, setStatusColor] = useState("success");
  const [disabledButton, setDisabledButton] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await api.get<ConfigType>(`configs/list`);

    let config = response.data;

    let content = config?.content;

    if (content) {
      config.content = prettyJSON(content);
    } else {
      config = {
        content: "{}",
      };
    }

    setConfig(config);
  };

  const prettyJSON = (content: string) => {
    const obj = JSON.parse(content);
    const pretty = JSON.stringify(obj, undefined, 4);
    return pretty;
  };

  if (!config?.content) {
    return <Loader />;
  }

  const breadcrumb = [
    {
      active: true,
      href: "/",
      text: "Home",
    },
    {
      active: true,
      href: `/settings`,
      text: "Settings",
    },
  ];

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    if (value.length >= 1) {
      if (!validateJson(value)) {
        setStatusColor("error");
        setDisabledButton(true);
        return;
      }
    }
    setStatusColor("success");
    setDisabledButton(false);
    setConfig({ ...config, content: value });
  };

  const handleSubmit = async () => {
    try {
      setShowLoader(true);

      const content = config.content;

      const idConfig = config.id;

      if (idConfig) {
        setConfig(null);

        const response = await api.patch<ConfigType>(
          `configs/edit/${idConfig}`,
          {
            content,
          }
        );

        const config = response.data;

        config.content = prettyJSON(config.content);

        setConfig(config);
      } else {
        const response = await api.post<ConfigType>("configs/add", {
          content,
        });
        const config = response.data;

        config.content = prettyJSON(config.content);

        setConfig(config);
      }

      setShowLoader(false);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  };

  const validateJson = (value: any) => {
    if (typeof value == "object") {
      try {
        value = JSON.stringify(value);
      } catch (err) {
        return false;
      }
    }

    if (typeof value == "string") {
      try {
        value = JSON.parse(value);
      } catch (err) {
        return false;
      }
    }

    if (typeof value != "object") {
      return false;
    }

    return true;
  };
  return (
    <Container fluid className="p-0">
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle title="Settings" description="Edit environment" />
          <BreadCrumb items={breadcrumb} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Panel>
            <Col sm="12" lg="12">
              <FormGroup>
                <Form.Label>DDL Command (SQL)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="config"
                  defaultValue={config.content}
                  onChange={handleChangeInput}
                  className={statusColor}
                  placeholder="Enter with config"
                />
              </FormGroup>
            </Col>
            <Col
              sm="12"
              className="d-flex align-items-center justify-content-end mt-3"
            >
              <Button
                type="button"
                onClick={() => handleSubmit()}
                disabled={disabledButton}
              >
                Save
              </Button>
            </Col>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
