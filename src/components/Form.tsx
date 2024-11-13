import React, { FC } from "react";
import { Form, Input, Button, InputNumber, Row, Col, Typography } from "antd";
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import IProcedure from "../models/IProcedure";
import useFieldArray from "../hooks/useFieldArray";

const { Title, Text } = Typography;

type IProps = {
  procedures: IProcedure[];
  onSave: (procedures: Partial<IProcedure>[]) => void;
  onCancel: () => void;
};

const Header: FC<{ onAdd: () => void }> = ({ onAdd }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        marginBottom: 20,
      }}
    >
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
    </div>
  );
};

const ProcedureForm: React.FC<IProps> = ({ procedures, onSave, onCancel }) => {
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
    <div>
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
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(index)}
                style={{ marginRight: "16px", color: "gray" }}
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
                      placeholder="Ej: "
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
                      placeholder="Código"
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
                      placeholder="Reclamado RD$"
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
                      placeholder="Diferencia RD$"
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
                      placeholder="Autorizado RD$"
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
            disabled={fields.length === 0 && procedures.length === 0}
          >
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProcedureForm;
