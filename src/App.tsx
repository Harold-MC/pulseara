import { useState } from "react";
import { Modal } from "antd";
import IProcedure from "./models/IProcedure";
import { useSaveProcedures } from "./hooks/useSaveProcedures";
import { useProcedures } from "./network";
import Form from "./components/Form";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);

  const { data, refetch } = useProcedures();

  const { saveProcedures, isLoading } = useSaveProcedures(data);

  const showModal = () => {
    setShowForm(true);
  };

  const onCancel = () => setShowForm(false);

  const handleSubmit = async (procedures: Partial<IProcedure>[]) => {
    await saveProcedures(procedures);
    refetch();
    setShowForm(false);
  };

  return (
    <>
      {data.length === 0 ? (
        <NotFound onEdit={showModal} />
      ) : (
        <Home onEdit={showModal} procedures={data} />
      )}
      {showForm && (
        <Modal width={1200} open={showForm} onCancel={onCancel} footer={null}>
          <Form
            procedures={data}
            onSave={handleSubmit}
            onCancel={onCancel}
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
