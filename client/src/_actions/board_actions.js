import axios from 'axios';
import {
	LOAD_BOARD,
	UPLOAD_BOARD
} from './_types';
import { BOARD_SERVER } from '../components/Config.js';

export const loadBoard = async (dataToSubmit) => {
	const request = await axios.get(`${BOARD_SERVER}/load`,dataToSubmit)
											.then(response => response.data);
	return {
		type: LOAD_BOARD,
		payload: request
	};
};

export function uploadBoard(dataToSubmit){
	const request = axios.post(`${BOARD_SERVER}/upload`,dataToSubmit)
											.then(response => response.data);
	return {
		type: UPLOAD_BOARD,
		payload: request
	};
};