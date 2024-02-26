import React from 'react'
import { styled, alpha, InputBase } from '@mui/material'
import { MagnifyingGlass } from 'phosphor-react';

export default function Search_Component() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default, 0.25),
        },
        marginRight: theme.spacing(3),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(2),
            width: 'auto'
        }
    }));


    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width:'100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
            [theme.breakpoints.up('xs')]: {
                width: '100%',
            },

        },
    }));

    return (
        <Search >
            <SearchIconWrapper>
                <MagnifyingGlass width={'24px'} height={'24px'} color='blue' />
            </SearchIconWrapper>
            <StyledInputBase 
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />

        </Search>
    )
}
