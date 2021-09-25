import * as React from 'react'
import { PokemonData } from '../../model/PokemonData'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import classes from './PokemonModal.module.scss'

interface IPokemonModalProps {
  data: PokemonData;
  open: boolean;
  handleClose: () => void;
}

const PokemonModal: React.FC<IPokemonModalProps> = ({
  data,
  open,
  handleClose
}) => {
  return (
    <Modal
      className={classes.PokemonModal}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box className={classes.ModalBox}>
          <Typography variant='h6' component='h2' className={classes.name}>
            {data.name}
          </Typography>
          <div className={classes.TypeContainer}>
            Type:
            {data.types.map((item) => (
              <span
                key={item.type.url}
                className={`${classes.type} ${item.type.name}`}
              >
                {item.type.name}
              </span>
            ))}
          </div>
          <div className={classes.StateContainer}>
            {data.stats.map((item) => (
              <div key={item.stat.url} className={classes.statText}>
                <span className={classes.statTitle}>{item.stat.name}</span>:
                <span className={classes.statValue}>{item.base_stat}</span>
              </div>
            ))}
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default PokemonModal
