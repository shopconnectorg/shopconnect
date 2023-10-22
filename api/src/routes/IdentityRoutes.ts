import { StatusCodes } from 'http-status-codes';
import { IReq, IRes } from './types/express/requests';
// import { initIssuerOnce } from '../lib/init';

async function confirmCredential(req: IReq, res: IRes) {
  // const { dataStorage, credentialWallet } = await initIssuerOnce();
  // const { credentialId } = req.params;
  // const c1 = await dataStorage.credential.findCredentialById(credentialId);
  // const c2 = await credentialWallet.findById(credentialId);
  // req.body;
  // //FIXME: Dummy implementation for the demo purposes
  // const credential = {};
  // return res.status(StatusCodes.OK).json({ credential });
}

export default {
  confirmCredential,
};