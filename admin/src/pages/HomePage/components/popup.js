import React from 'react';

import { useIntl } from 'react-intl';

import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  Flex,
  Box,
  Typography,
  TextInput,
  JSONInput,
} from '@strapi/design-system';

const Popup = (props) => {

  const { formatDate } = useIntl();

  const {
    popupVisible,
    setPopupVisible,
    auditContent
  } = props

  return !popupVisible ?
    null
  :
    <ModalLayout onClose={() => setPopupVisible(false)} labelledBy="title">
      
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h1" id="title">
          Action: {auditContent.action} | ID: {auditContent.id}
        </Typography>
      </ModalHeader>
      
      <ModalBody>
        <Flex>
          <Box padding={2} width={`50%`}>
            <TextInput
              label="Date"
              name="date"
              hint="Date the entry was changed."
              value={formatDate(auditContent.updatedAt, { dateStyle: 'full' })}
              disabled
            />
          </Box>

          <Box padding={2} width={`50%`}>
            <TextInput
              label="User"
              name="user"
              hint="User who changed the entry."
              value={auditContent.user}
              disabled
            />
          </Box>
        </Flex>

        <Box padding={2}>
          <JSONInput
            value={JSON.stringify(auditContent.request, null, "\t")}
            disabled
            label="Raw request data"
            hint="Raw input for change request."
          />
        </Box>

      </ModalBody>
    </ModalLayout>
}

export default Popup