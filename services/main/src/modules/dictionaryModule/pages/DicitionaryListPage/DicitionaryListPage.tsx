import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DictionaryCards } from '../../components/DictionaryCards/DictionaryCards'
import { useTheme } from '@mui/material'
import { Formik, useFormik } from 'formik'
import { Dictionary } from '../../components/Dictionary/Dictionary'
import { useAuth } from '@/modules/authModule/hooks/authHook'
import { useDictionaryListPage } from '../../hooks/useDictionaryListPage'

interface Props {}

export const DicitionaryListPage: React.FC<Props> = ({}) => {
  const { cards, isDictionariesLoading } = useDictionaryListPage()
  //   const loading = true
  //   const cards = []

  const [modal, setModal] = useState(false)
  const { breakpoints } = useTheme()

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: values => {
      values.title = ''
      setModal(false)
    },
    validate: values => {
      const errors: any = {}
      if (!values.title) {
        errors.title = 'Required'
        return errors
      }
    },
  })

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <Box
          display={'flex'}
          sx={{
            [breakpoints.down(470)]: {
              flexDirection: 'column',
              alignItems: 'start',
            },
          }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <h1>Select dictionary</h1>
          <Button
            sx={{ height: '40px' }}
            variant="contained"
            onClick={() => setModal(true)}
          >
            Create dictionary
          </Button>
        </Box>
        <DictionaryCards cards={cards} loading={isDictionariesLoading} />
      </Box>


      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            maxWidth: '400px',
            width: '100%',
            height: '150px',
            background: 'white',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <Box>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.title}
                name="title"
                fullWidth={true}
                label="Title"
                variant="outlined"
              />
            </Box>
            {formik.errors.title && 'error'}
            <Button
              type="submit"
              sx={{ marginTop: 'auto' }}
              variant="contained"
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}
