import { FC, useMemo } from "react";
import { Row, Col, Typography } from "antd";
import { padStart, truncate } from "lodash";
import IProcedure from "../models/IProcedure";

const { Text } = Typography;

type IProps = {
  procedure: IProcedure;
  index: number;
};

const ProcedureItem: FC<IProps> = ({ procedure, index }) => {
  const procedureNumber = useMemo(() => {
    return padStart((index + 1).toString(), 2, "0");
  }, [index]);

  return (
    <Row gutter={10} style={styles.container}>
      <Col xs={24} md={5}>
        <Text style={styles.label}>Procedimiento {procedureNumber}</Text>
        <Text style={styles.description}>
          {truncate(procedure.name, { length: 18 })}
        </Text>
      </Col>

      <Col xs={24} md={4} lg={4}>
        <Text style={styles.label}>Código</Text>
        <Text style={styles.description}>{procedure.code}</Text>
      </Col>

      <Col xs={24} md={5}>
        <Text style={styles.label}>Reclamado</Text>
        <Text style={styles.description}>RD$ {procedure.reclaimed}</Text>
      </Col>

      <Col xs={24} md={5}>
        <Text style={styles.label}>Diferencia</Text>
        <Text style={styles.description}>RD$ {procedure.difference}</Text>
      </Col>

      <Col xs={24} md={5}>
        <Text style={styles.label}>Autorizado</Text>
        <Text style={styles.description}>RD$ {procedure.authorized}</Text>
      </Col>
    </Row>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  label: {
    color: "#949494",
    fontWeight: 400,
    fontSize: 16,
    display: "block",
  },
  description: {
    fontWeight: "bold",
  },
};

export default ProcedureItem;
