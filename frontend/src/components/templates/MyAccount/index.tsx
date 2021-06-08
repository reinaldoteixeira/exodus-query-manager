import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import getValidationErrors, {
  Errors,
} from "../../../utils/getValidationErrors";

import api from "../../../services/api";
import { UserType } from "../../../@types";

import PageTitle from "../../elements/PageTitle/PageTitle";
import Panel from "../../elements/Panel/Panel";
import UserForm from "../../modules/UserForm/UserForm";
import Loader from "../../elements/Loader";
import BreadCrumb from "../../elements/Breadcrumb";

const MyAccount: React.FC = () => {
  const [changedUser, setChangedUser] = useState({});
  const [errors, setErrors] = useState({} as Errors);
  const [user, setUser] = useState<UserType>();
  const [showLoader, setShowLoader] = useState(false);

  const router = useRouter();
  const userId = router.query.id;

  useEffect(() => {
    if (!user && userId) {
      loadData(userId);
    }
  }, [userId]);

  const loadData = async (userId: string | string[]) => {
    const response = await api.get<UserType>(`users/detail/${userId}`);
    const user = response.data;
    setUser(user);
    setChangedUser({
      email: user.email,
      name: user.name,
    });
  };

  if (!user) {
    return <Loader />;
  }

  const handleChange = (key: string, value: any) => {
    setChangedUser({
      ...changedUser,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        email: Yup.string().email().required("Email is required").email(),
        name: Yup.string().required("Name is required"),
        password: Yup.string().min(6, "Minimum of 6 characters"),
        role: Yup.string(),
      });

      await schema.validate(changedUser, {
        abortEarly: false,
      });

      setShowLoader(true);

      try {
        await api.patch(`/users/edit/${userId}`, {
          ...changedUser,
        });

        router.push(`/users`);
      } catch (err) {
        console.log(`ERROR: ${err}`);
      }

      setShowLoader(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    }
  };

  const breadcrumb = [
    {
      active: true,
      href: "/",
      text: "Home",
    },
    {
      active: true,
      href: `/account/${userId}`,
      text: user.email,
    },
  ];

  return (
    <Container fluid className="p-0">
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle title="My account" description="Edit account details" />
          <BreadCrumb items={breadcrumb} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Panel>
            <UserForm
              onChange={handleChange}
              onSubmit={handleSubmit}
              errors={errors}
              user={user}
              myAccount={true}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
