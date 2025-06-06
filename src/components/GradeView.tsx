import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, Box, IconButton, Breadcrumbs, Link, Paper } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GradeFiles from './GradeFiles'

const gradeNames: { [key: string]: string } = {
  'freebies': 'FREEBIES',
  'grade7': 'GRADE 7 MATATAG - ALL IN FILES',
  'grade8': 'GRADE 8',
  'grade9': 'GRADE 9',
  'grade10': 'Grade 10 DLP with PPT',
  'grade11-12': 'GRADE 11 & 12 NEW 2024 UPDATE'
}

const GradeView = () => {
  const { gradeLevel } = useParams<{ gradeLevel: string }>()
  const navigate = useNavigate()
  const gradeName = gradeLevel ? gradeNames[gradeLevel] : ''

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" onClick={handleBack} sx={{ cursor: 'pointer' }}>
            Home
          </Link>
          <Typography color="text.primary">{gradeName}</Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {gradeName}
        </Typography>

        {gradeLevel && <GradeFiles gradeLevel={gradeLevel} />}
      </Paper>
    </Container>
  )
}

export default GradeView