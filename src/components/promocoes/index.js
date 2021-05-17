import { Pane } from 'evergreen-ui';
import Container from '../container';
import { paneprops } from './props';
import { Button, Backdrop, CircularProgress, Snackbar, GridList, IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { _deleteImageBase64, _getImageBase64, _salvaImageBase64 } from './services';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalDeletar from '../../constants/modal';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
}));

export default function Cadastro() {

    const [logo, setLogo] = useState();
    const [image, setImage] = useState();
    const [backDrop, setBackDrop] = useState(false);
    const [modal, setModal] = useState();
    const [message, setMessage] = useState();
    const [snackbar, setSnack] = useState(false);
    const [type, setType] = useState();
    const [disable, setDisable] = useState([]);
    const [pics, setPics] = useState([]);
    const classes = useStyles();

    let history = useHistory();

    useEffect(async () => {
        const token = await sessionStorage.getItem('token');
        if (token) { console.log(token) }
        else { history.push('/'); }
        await getFoto();
    }, [image, logo]);


    async function onChangeImg(e) {
        setLogo(e.target.files[0]);
        let myfile = e.target.files[0];
        const base64 = await convertBase64(myfile)
        setImage(base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);

            };
            fileReader.onerror = (error) => { reject(error) }
        })
    }


    async function salvaFoto() {
        setBackDrop(true);
        const response = await _salvaImageBase64({ base64: image })
            .then(response => { setBackDrop(false); setSnack(true); setMessage("Imagem salva com sucesso!"); setType('success'); getFoto(); })
            .catch(error => { setBackDrop(false); setSnack(true); setMessage("Erro ao salvar imagem. Tente novamente"); setType('error'); getFoto(); });

    }

    async function getFoto() {
        setModal();
        setBackDrop(true);
        const response = await _getImageBase64()
            .then((response) => { setBackDrop(false); setPics(response.data.img); })
            .catch((error) => { setBackDrop(false); setPics(error); });

    }

    const closeModal = () => { setModal() }

    const deletarImg = async (id) => {
        let close = closeModal;
        let deletaIMG = deletaImage;
        let modalDelete = await ModalDeletar(id, "esta imagem", close, deletaIMG);
        setModal(modalDelete);
    }


    async function deletaImage(id) {
        setBackDrop(true);
        const response = await _deleteImageBase64(id)
            .then(response => { setBackDrop(false); setSnack(true); setMessage("Imagem deletada com sucesso!"); setType('success'); getFoto(); })
            .catch(error => { setBackDrop(false); setSnack(true); setMessage("Erro ao deletar imagem. Tente novamente"); setType('error'); getFoto(); });
    }


    return (
        <div>
            <Backdrop open={backDrop}> <CircularProgress color="inherit" /></Backdrop>
            <Snackbar open={snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={300}><Alert severity={type}>{message}</Alert></Snackbar>
            <Container value={2} />
            <Pane {...paneprops} >
                <div className={classes.root} style={{ width: '50%', height: '100%', flexDirection: 'column', alignItems: "flex-start" }}>
                    <input accept="image/*" className={classes.input} id="contained-button-file" name="logo" multiple
                        type="file" onChange={(e) => onChangeImg(e)} />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" color="secondary" component="span">Selecionar Imagem</Button>
                    </label>
                    <div>
                        Prévia da imagem
                    <figure><img src={image} alt="i" style={{ borderRadius: '10px' }} height='200' width='200' /></figure>
                    </div>
                    <div>
                        <Button variant="outlined" color="inherit" onClick={() => salvaFoto()}>Enviar para o App</Button>
                    </div>
                </div>
                <div style={{ width: '50%', height: '100%', flexDirection: 'column', alignItems: "flex-start" }}>
                    <Button onClick={() => getFoto()}>Carregar Imagens</Button>
                    <GridList cellHeight={450} className={classes.gridList} cols={1}>
                        {
                            pics.map(row => {
                                if (row.img != "") {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <IconButton label="del" onClick={() => deletarImg(row.id)}> <DeleteIcon color="error" /> </IconButton>
                                            <figure><img src={row.img} style={{ borderRadius: '10px' }} height='400' width='400' /></figure>
                                        </div>
                                    );
                                }
                            })
                        }
                    </GridList>
                </div>
            </Pane>
            {modal}
        </div >
    )
}

