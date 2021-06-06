import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

import api from '../../../services/api';
import theme from '../../../styles/theme';

import Select from '../../elements/Select/Select';

import { RowEmpty, RowPie, RowTable } from './styles';

interface ExplainProps {
  requestId: string | string[];
  databases: string;
}

interface ExplainType {
  id: number;
  select_type: string;
  table: string;
  partitions: any;
  type: string;
  possible_keys: string;
  key: string;
  key_len: string;
  Extra: string;
  rows: number;
  filtered: number;
  ref: any;
}

const Explain: React.FC<ExplainProps> = ({ requestId, databases }) => {
  const [explain, setExplain] = useState<ExplainType[]>([]);

  const getExplain = async (database: string) => {
    try {
      if (!database) {
        setExplain([]);
        return;
      }

      const response = await api.get(
        `requests/explain/${requestId}?database=${database}`
      );

      const explain = response.data;

      //mock
      let teste = [];

      for (let index = 0; index < 12; index++) {
        teste.push(explain[0]);
      }
      //removerMock

      setExplain(explain);
    } catch (err) {
      setExplain([]);
    }
  };

  const getPieData = () => {
    let data = [0, 0];

    if (explain.length) {
      const filtered = explain[0].filtered;
      const notFilterd = 100 - filtered;
      data = [filtered, notFilterd];
    }

    return {
      labels: ['Filtered', 'Not filtered'],
      datasets: [
        {
          backgroundColor: [theme.colors.primary, theme.colors.danger],
          hoverBackgroundColor: [theme.colors.primary, theme.colors.danger],
          data,
        },
      ],
    };
  };

  return (
    <Container fluid className="p-0">
      <Row>
        <Col sm="12" lg="3">
          <label>Select Database: </label>
          <Select
            instanceId="databases"
            name="databases"
            onChange={({ value }) => getExplain(value)}
            options={JSON.parse(databases)}
          />
        </Col>
      </Row>
      {!explain.length ? (
        <RowEmpty>
          <span className="icon">
            <FontAwesomeIcon icon={faChartPie} />
          </span>
          <h3>Select a database to show explain...</h3>
        </RowEmpty>
      ) : (
        <>
          <RowPie sm="12">
            <Pie
              type="data"
              data={getPieData()}
              width={30}
              height={30}
              options={{
                animation: false,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Explain - filtered',
                  },
                },
              }}
            />
          </RowPie>
          <RowTable sm="12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>select_type</th>
                  <th>table</th>
                  <th>partitions</th>
                  <th>type</th>
                  <th>possible_keys</th>
                  <th>key</th>
                  <th>key_len</th>
                  <th>rows</th>
                  <th>filtered</th>
                  <th>extra</th>
                  <th>ref</th>
                </tr>
              </thead>
              <tbody>
                {explain.map((explainRow, index) => {
                  return (
                    <tr key={index}>
                      <td>{explainRow.id}</td>
                      <td>{explainRow.select_type}</td>
                      <td>{explainRow.table}</td>
                      <td>{explainRow.partitions}</td>
                      <td>{explainRow.type}</td>
                      <td>{explainRow.possible_keys}</td>
                      <td>{explainRow.key}</td>
                      <td>{explainRow.key_len}</td>
                      <td>{explainRow.rows}</td>
                      <td>{explainRow.filtered}</td>
                      <td>{explainRow.Extra}</td>
                      <td>{explainRow.ref}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </RowTable>
        </>
      )}
    </Container>
  );
};

export default Explain;
