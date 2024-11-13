import React, { useState } from 'react'
import { Box, Modal } from '@mui/material'
import s from '../../styles/DictionaryPage.module.scss'
import myVideo from './sample-5s.mp4'
import changeTitleVideo from './changeTitle.mp4'
import changeOrderVideo from './changeOrder.mp4'

interface Props {
  open: boolean
  setOpen: any
}

export const DescriptionModal: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
        }}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Box className={s['description-modal']}>
          <Box>What you can do?</Box>
          <Box>
            <p>You can drag elements</p>
            <video
              className={s.video}
              muted
              loop={true}
              autoPlay={true}
              style={{}}
              width="100%"
              controls
            >
              <source src={changeOrderVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Box>
            <p>You can change title or translation</p>
            <video
              className={s.video}
              muted
              loop={true}
              autoPlay={true}
              style={{}}
              width="100%"
              controls
            >
              <source src={changeTitleVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Box>
            
          </Box>
        </Box>
      </Modal>
    </>
  )
}
