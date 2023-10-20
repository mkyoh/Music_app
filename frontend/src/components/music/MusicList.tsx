import React, { useState, useRef, ChangeEvent } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import "./datatable.css";

interface Song {
    id: string | null;
    title: string;
    artist: string;
    album: string;
    genre: string | null;
  

}

export default function SongsDemo() {
    let emptySong: Song = {
        id: null,
        title: '',
        artist: '',
        album: '',
        genre: '',
 
    };

    const [Songs, setSongs] = useState<Song[]>([]);
    const [SongDialog, setSongDialog] = useState<boolean>(false);
    const [deleteSongDialog, setDeleteSongDialog] = useState<boolean>(false);
    const [deleteSongsDialog, setDeleteSongsDialog] = useState<boolean>(false);
    const [Song, setSong] = useState<Song>(emptySong);
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Song[]>>(null);

    // useEffect(() => {
    //     SongService.getSongs().then((data) => setSongs(data));
    // }, []);


    const hideDialog = () => {
        setSongDialog(false);
    };

    const hideDeleteSongDialog = () => {
        setDeleteSongDialog(false);
    };

    const hideDeleteSongsDialog = () => {
        setDeleteSongsDialog(false);
    };

    const editSong = (Song: Song) => {
        setSong({ ...Song });
        setSongDialog(true);
    };

    const confirmDeleteSong = (Song: Song) => {
        setSong(Song);
        setDeleteSongDialog(true);
    };

    const deleteSong = () => {
        let _Songs = Songs.filter((val) => val.id !== Song.id);

        setSongs(_Songs);
        setDeleteSongDialog(false);
        setSong(emptySong);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Song Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < Songs.length; i++) {
            if (Songs[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = (): string => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteSongsDialog(true);
    };

    const deleteSelectedSongs = () => {
        let _Songs = Songs.filter((val) => !selectedSongs.includes(val));

        setSongs(_Songs);
        setDeleteSongsDialog(false);
        setSelectedSongs([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Songs Deleted', life: 3000 });
    };

    const [file, setFile] = useState<File | null>(null);

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
    };
    const addSong = () => {
        if (file) {
            const newSong: Song = {
                id: generateId(),
                title: file.name,
                artist: '', // Set the artist value
                album: '', // Set the album value
                genre: '', // Set the genre value
                
            };

            setSongs((prevSongs) => [...prevSongs, newSong]);
            setFile(null);
        }
    };

    const generateId = (): string => {
        // Implement your function to generate a unique ID for each song
        // Return a unique ID here
        return '';
    };

    const renderFileData = () => {
        if (file) {
            return (
                <div>
                    <p>Selected File: {file.name}</p>
                    <button onClick={addSong}>Add Song</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>No file selected.</p>
                    <input type="file" name="file" onChange={handleFile} accept="audio/*" />
                </div>
            );
        }
    };
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-4">
                
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedSongs || !selectedSongs.length} />
            </div>
        );
    };

    const actionBodyTemplate = (rowData: Song) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editSong(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteSong(rowData)} />
            </React.Fragment>
        );
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Songs</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Search..." onInput={(e) => { const target = e.target as HTMLInputElement; setGlobalFilter(target.value); }} />
            </span>
        </div>
    );

    const deleteSongDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSongDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSong} />
        </React.Fragment>
    );
    const deleteSongsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSongsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedSongs} />
        </React.Fragment>
    );

    return (
        <div>
          <div className="card">
                {renderFileData()}
                <DataTable
                value={Songs}
                    ref={dt}
                    
                    //  value={Songs} selection={selectedSongs}  
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedSongs(e.value);
                        }
                    }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Songs" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="artist" header="Artist" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="album" header="Album" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="genre" header="Genre" sortable style={{ minWidth: '40rem' }}></Column>
              

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteSongDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSongDialogFooter} onHide={hideDeleteSongDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Song && (
                        <span>
                            Are you sure you want to delete <b>{Song.title}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteSongsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSongsDialogFooter} onHide={hideDeleteSongsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Song && <span>Are you sure you want to delete the selected Songs?</span>}
                </div>
            </Dialog>
        </div>
    );
}
