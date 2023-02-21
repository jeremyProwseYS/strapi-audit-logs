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

import { useIntl } from 'react-intl';

import Eye from '@strapi/icons/Eye';

import {
  BaseHeaderLayout,
  ContentLayout,
  IconButton,
  EmptyStateLayout,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
} from "@strapi/design-system";

import { useQueryParams, useFetchClient } from '@strapi/helper-plugin';

import logsRequest from '../../api/logs';

import Popup from './components/popup';
import AttributeFilter from './components/attributeFilters';
import PaginationFooter from './components/paginationFooter';

const HomePage = () => {

  const { get } = useFetchClient();
  const {formatDate} = useIntl();

  const uid = `plugin::strapi-audit-logs.audit-log`;
  const componentFetchURL = `/content-manager/content-types/${uid}/configuration`;
  const attributesFetchURL = `/content-manager/content-types`;
  const [contentType, setContentType] = useState(false);

  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [logCount, setLogCount] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [auditContent, setAuditContent] = useState(false);

  const [{ query }] = useQueryParams();

  const handleAuditClick = (id) => {
    logsRequest.getLog(id).then(res => {
      setAuditContent(res.data);
    });
  }

  useEffect( async () => {
    const [{ data: contentTypeList }, { data: contentType }] = await Promise.all(
      [attributesFetchURL, componentFetchURL].map((endPoint) =>
        get(endPoint)
      )
    );

    const contentTypeAttributes = contentTypeList.data.find((item) => item.uid === uid).attributes
    const contentTypeExploded = contentType?.data?.contentType;

    const mainFieldName = contentTypeExploded.settings.mainField;
    const mainFieldAttribute = contentTypeAttributes[mainFieldName];

    const formattedContentType = {
      ...contentTypeExploded,
      attributes: contentTypeAttributes,
      metadatas: {
        ...contentTypeExploded.metadatas,
        mainField: {
          ...mainFieldAttribute,
          name: mainFieldName,
        },
      },
    }

    setContentType(formattedContentType)

  }, [])

  useEffect(() => {

    const params = {
      pagination: {}
    };

    if (query?.filters) {
      params['filters'] = query.filters
    }

    if (query?.page) {
      params['pagination']['page'] = query.page
    }

    if (query?.pageSize) {
      params['pagination']['pageSize'] = query.pageSize
    }

    logsRequest.getLogs(params).then(res => {
      setLogCount(res.data.results.length);
      setLogs(res.data.results);
      setPagination(res.data.pagination);
    });
  }, [query]);

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
          <>
            {contentType &&
              <AttributeFilter contentType={contentType} metadatas={contentType.metadatas} slug={contentType.uid} />
            }
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
                    <Typography textColor="neutral800">{formatDate(entry.date, { dateStyle: 'full' })}</Typography>
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
            <PaginationFooter pagination={pagination} />
          </>
        }
      </ContentLayout>

      <Popup auditContent={auditContent} popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
    </>
  );
};

export default memo(HomePage);