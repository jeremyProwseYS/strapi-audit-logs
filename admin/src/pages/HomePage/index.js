/*
 *
 * HomePage
 *
 */

import React, {
  memo,
  useState,
  useEffect
} from 'react';

import Eye from '@strapi/icons/Eye';

import {
  BaseHeaderLayout,
  ContentLayout,
  IconButton,
  EmptyStateLayout,
  Layout,
  BaseCheckbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Box,
  Flex
} from "@strapi/design-system";

import Popup from './popup';

import logsRequest from '../../api/logs';

const HomePage = () => {
  
  const [logs, setLogs] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [auditContent, setAuditContent] = useState(false);

  const handleAuditClick = (id) => {
    logsRequest.getLog(id).then(res => {
      setAuditContent(res.data);
    });
  }

  useEffect(() => {
    logsRequest.getLogs().then(res => {
      setLogCount(res.data.length);
      setLogs(res.data);
    });
  }, []);

  useEffect(() => {
    if (auditContent) {
      setPopupVisible(true)
    }
  }, [auditContent])

  return (
    <>
      <BaseHeaderLayout
        title="Audit Logs"
        subtitle="Latest logs are displayed below."
        as="h2"
      />
      <ContentLayout>

        { logCount === 0 ?
          <EmptyStateLayout content="You don't have any logs yet..." />
        :
          <Table colCount={4} rowCount={logCount}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Action</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Date</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">User</Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {logs.map(entry => <Tr key={entry.id}>
                  <Td>
                    <Typography textColor="neutral800">{entry.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.action}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.date}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.user}</Typography>
                  </Td>
                  <Td>
                    <IconButton onClick={() => handleAuditClick(entry.id)} label="View" noBorder icon={<Eye />} />
                  </Td>
                </Tr>)}
              </Tbody>
          </Table>
        }
      </ContentLayout>

      <Popup auditContent={auditContent} popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
    </>
  );
};

export default memo(HomePage);