import React, { FC } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Row,
  Col,
  Typography,
  Space,
  Grid,
} from "antd";
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import IProcedure from "../models/IProcedure";
import useFieldArray from "../hooks/useFieldArray";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

type IProps = {
  procedures: IProcedure[];
  onSave: (procedures: Partial<IProcedure>[]) => void;
  onCancel: () => void;
  isLoading: boolean;
};

const Header: FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const screens = useBreakpoint();

  return (
    <Space direction={screens.xs ? "vertical" : "horizontal"} size="small">
      <Title level={2} style={{ margin: 0 }} className="form-title">
        Procedimientos
      </Title>
      <Button
        icon={<PlusOutlined />}
        type="text"
        style={{ color: "#00a65a", fontSize: "16px", fontWeight: 500 }}
        onClick={onAdd}
      >
        Añadir procedimiento
      </Button>
    </Space>
  );
};

const ProcedureForm: React.FC<IProps> = ({
  procedures,
  onSave,
  onCancel,
  isLoading,
}) => {
  const screens = useBreakpoint();

  const { fields, append, remove, update } =
    useFieldArray<Partial<IProcedure>>(procedures);

  const handleAdd = (): void => {
    append({ name: "", code: 0, reclaimed: 0, difference: 0, authorized: 0 });
  };

  const handleRemove = (index: number): void => {
    remove(index);
  };

  const handleChange = (
    index: number,
    field: keyof IProcedure,
    value: string | number
  ): void => {
    const parsedValue = typeof value === "number" ? +value : value;
    update(index, { [field]: parsedValue });
  };

  const save = () => {
    onSave(fields);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Header onAdd={handleAdd} />
      {fields.length === 0 && <Text>No hay procedimientos agregados.</Text>}
      <Form onFinish={save} layout="vertical">
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: screens.xs ? "flex-start" : "center",
                width: "100%",
              }}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(index)}
                style={{
                  marginRight: "16px",
                  marginTop: screens.xs ? 30 : 0,
                  color: "gray",
                }}
              />
              <Row gutter={[16, 16]} style={{ flex: 1, width: "100%" }}>
                <Col xs={24} md={5}>
                  <Form.Item label={`Procedimiento ${index + 1}`}>
                    <Input
                      className="text-input"
                      value={field.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      placeholder="Ej: 4563523"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item label="Código">
                    <InputNumber
                      className="text-input"
                      value={field.code}
                      onChange={(value) =>
                        handleChange(index, "code", value || 0)
                      }
                      placeholder="Ej: 4563523"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={5}>
                  <Form.Item label="Reclamado RD$">
                    <InputNumber
                      className="text-input"
                      value={field.reclaimed}
                      onChange={(value) =>
                        handleChange(index, "reclaimed", value || 0)
                      }
                      placeholder="Ej: 4563523"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={5}>
                  <Form.Item label="Diferencia RD$">
                    <InputNumber
                      className="text-input"
                      value={field.difference}
                      onChange={(value) =>
                        handleChange(index, "difference", value || 0)
                      }
                      placeholder="Ej: 4563523"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={5}>
                  <Form.Item label="Autorizado RD$">
                    <InputNumber
                      className="text-input"
                      value={field.authorized}
                      onChange={(value) =>
                        handleChange(index, "authorized", value || 0)
                      }
                      placeholder="Ej: 4563523"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 9 }}>
          <Button
            style={{ color: "GrayText" }}
            type="link"
            htmlType="submit"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
            disabled={
              (fields.length === 0 && procedures.length === 0) || isLoading
            }
          >
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProcedureForm;
