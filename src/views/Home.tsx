import { Button, Row, Col, Typography } from "antd";
import ProcedureItem from "../components/ProcedureItem";
import { EditOutlined } from "@ant-design/icons";
import { FC } from "react";
import IProcedure from "../models/IProcedure";

const { Title } = Typography;

type IProps = {
    procedures: IProcedure[],
    onEdit: () => void
}

const Home: FC<IProps> = ({ procedures, onEdit }) => {
    return <div style={{ padding: 40 }}>
    <Title level={2}>Procedimientos</Title>

    <Row style={{ marginBottom: 15 }}>
      <Col xs={24} md={20} lg={16} xl={14}>
        <div
          style={{
            gap: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {procedures?.map((procedure, index) => (
            <ProcedureItem
              key={`${index}-${procedure.code}`}
              index={index}
              procedure={procedure}
            />
          ))}
        </div>
      </Col>
    </Row>

    <Button type="primary" onClick={onEdit} icon={<EditOutlined />}>
      Editar Procedimientos
    </Button>

  </div>
}

export default Home