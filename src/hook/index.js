import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import { PICTURE_LIST_ABI, PICTURE_LIST_ADDRESS } from "../config";

const simpleContractInterface = new ethers.utils.Interface(PICTURE_LIST_ABI);
const simpleContractAddress = PICTURE_LIST_ADDRESS;
const contract = new Contract(simpleContractAddress, simpleContractInterface);

const useCount = () => {
    const [count] =
        useContractCall({
            abi: simpleContractInterface,
            address: PICTURE_LIST_ADDRESS,
            method: "pictureCount",
            args: [],
        }) ?? [];
    return count;
}
const useContractMethod = (methodName) => {
    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
}

const useAssetsCall = (index) => {
	const [id, ipfsHash, name, description, vote] =
		useContractCall({
			abi: simpleContractInterface,
			address: PICTURE_LIST_ADDRESS,
			method: "pictures",
			args: [index],
		}) ?? [];
		console.log(name);
	return [id, ipfsHash, name, description, vote];
};
export {useCount, useAssetsCall, useContractMethod};
