import{z as u,v as E,y as C,w as m,an as O,F as M,S as L,I as q,C as y,_ as d,E as x,a as U,ao as F,b as $,c as N,h as V,G as D,f as b,k as z,l as _,m as B,A as K,B as h,a7 as g,a8 as f,ae as j,U as Q,af as Y,$ as A,J as G,ap as H,aq as T,ar as J,as as Z}from"./index.7660d089.js";const X=[{inputs:[{internalType:"string",name:"name_",type:"string"},{internalType:"string",name:"symbol_",type:"string"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}],k=u.object({contractAddress:E}),tt=k.extend({quantity:C}),et=k.extend({tokenId:m}),at=k.extend({tokenId:m,quantity:m}),W=tt.omit({quantity:!0}).extend({quantityPerReward:C}),P=et,S=at.omit({quantity:!0}).extend({quantityPerReward:m}),nt=W.extend({totalRewards:m.default("1")}),rt=P,st=S.extend({totalRewards:m.default("1")});u.object({erc20Rewards:u.array(W).default([]),erc721Rewards:u.array(P).default([]),erc1155Rewards:u.array(S).default([])});const I=u.object({erc20Rewards:u.array(nt).default([]),erc721Rewards:u.array(rt).default([]),erc1155Rewards:u.array(st).default([])}),ot=I.extend({packMetadata:O,rewardsPerPack:m.default("1"),openStartTime:M.default(new Date)});class ct{constructor(t,a,r,n,s){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:new y(t,a,H,n);d(this,"featureName",T.name),d(this,"contractWrapper",void 0),d(this,"storage",void 0),d(this,"chainId",void 0),d(this,"events",void 0),this.contractWrapper=o,this.storage=r,this.chainId=s,this.events=new b(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async open(t){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;const r=await this.contractWrapper.sendTransaction("openPack",[t,a],{gasLimit:5e5});let n=h.from(0);try{n=this.contractWrapper.parseLogs("PackOpenRequested",r==null?void 0:r.logs)[0].args.requestId}catch{}return{receipt:r,id:n}}async claimRewards(){const t=await this.contractWrapper.sendTransaction("claimRewards",[],{gasLimit:5e5}),a=this.contractWrapper.parseLogs("PackOpened",t==null?void 0:t.logs);if(a.length===0)throw new Error("PackOpened event not found");const r=a[0].args.rewardUnitsDistributed;return this.parseRewards(r)}async parseRewards(t){const a=[],r=[],n=[];for(const s of t)switch(s.tokenType){case 0:{const o=await g(this.contractWrapper.getProvider(),s.assetContract);a.push({contractAddress:s.assetContract,quantityPerReward:f(s.totalAmount,o.decimals).toString()});break}case 1:{r.push({contractAddress:s.assetContract,tokenId:s.tokenId.toString()});break}case 2:{n.push({contractAddress:s.assetContract,tokenId:s.tokenId.toString(),quantityPerReward:s.totalAmount.toString()});break}}return{erc20Rewards:a,erc721Rewards:r,erc1155Rewards:n}}async addPackOpenEventListener(t){return this.events.addEventListener("PackOpened",async a=>{t(a.data.packId.toString(),a.data.opener,await this.parseRewards(a.data.rewardUnitsDistributed))})}async canClaimRewards(t){const a=t||await this.contractWrapper.getSignerAddress();return await this.contractWrapper.readContract.canClaimRewards(a)}async openAndClaim(t){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:5e5;const n=await this.contractWrapper.sendTransaction("openPackAndClaimRewards",[t,a,r],{gasLimit:h.from(5e5)});let s=h.from(0);try{s=this.contractWrapper.parseLogs("PackOpenRequested",n==null?void 0:n.logs)[0].args.requestId}catch{}return{receipt:n,id:s}}async getLinkBalance(){return this.getLinkContract().balanceOf(this.contractWrapper.readContract.address)}async transferLink(t){await this.getLinkContract().transfer(this.contractWrapper.readContract.address,t)}getLinkContract(){const t=J[this.chainId];if(!t)throw new Error(`No LINK token address found for chainId ${this.chainId}`);const a=new y(this.contractWrapper.getSignerOrProvider(),t,X,this.contractWrapper.options);return new Z(a,this.storage,this.chainId)}}class R extends L{get vrf(){return q(this._vrf,T)}constructor(t,a,r){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,o=arguments.length>5?arguments[5]:void 0,i=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new y(t,a,s,n.gasless&&"openzeppelin"in n.gasless?{...n,gasless:{openzeppelin:{...n.gasless.openzeppelin,useEOAForwarder:!0}}}:n);super(i,r,o),d(this,"abi",void 0),d(this,"metadata",void 0),d(this,"roles",void 0),d(this,"encoder",void 0),d(this,"events",void 0),d(this,"estimator",void 0),d(this,"royalties",void 0),d(this,"interceptor",void 0),d(this,"erc1155",void 0),d(this,"owner",void 0),d(this,"_vrf",void 0),this.abi=s,this.erc1155=new x(this.contractWrapper,this.storage,o),this.metadata=new U(this.contractWrapper,F,this.storage),this.roles=new $(this.contractWrapper,R.contractRoles),this.royalties=new N(this.contractWrapper,this.metadata),this.encoder=new V(this.contractWrapper),this.estimator=new D(this.contractWrapper),this.events=new b(this.contractWrapper),this.interceptor=new z(this.contractWrapper),this.owner=new _(this.contractWrapper),this._vrf=this.detectVrf()}onNetworkUpdated(t){var a;this.contractWrapper.updateSignerOrProvider(t),(a=this._vrf)==null||a.onNetworkUpdated(t)}getAddress(){return this.contractWrapper.readContract.address}async get(t){return this.erc1155.get(t)}async getAll(t){return this.erc1155.getAll(t)}async getOwned(t){return this.erc1155.getOwned(t)}async getTotalCount(){return this.erc1155.totalCount()}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(B("transfer"),K)}async getPackContents(t){const{contents:a,perUnitAmounts:r}=await this.contractWrapper.readContract.getPackContents(t),n=[],s=[],o=[];for(let i=0;i<a.length;i++){const c=a[i],e=r[i];switch(c.tokenType){case 0:{const l=await g(this.contractWrapper.getProvider(),c.assetContract),p=f(c.totalAmount,l.decimals);n.push({contractAddress:c.assetContract,quantityPerReward:e.toString(),totalRewards:h.from(p).div(e).toString()});break}case 1:{s.push({contractAddress:c.assetContract,tokenId:c.tokenId.toString()});break}case 2:{o.push({contractAddress:c.assetContract,tokenId:c.tokenId.toString(),quantityPerReward:e.toString(),totalRewards:h.from(c.totalAmount).div(e).toString()});break}}}return{erc20Rewards:n,erc721Rewards:s,erc1155Rewards:o}}async create(t){const a=await this.contractWrapper.getSignerAddress();return this.createTo(a,t)}async addPackContents(t,a){const r=await this.contractWrapper.getSignerAddress(),n=I.parse(a),{contents:s,numOfRewardUnits:o}=await this.toPackContentArgs(n),i=await this.contractWrapper.sendTransaction("addPackContents",[t,s,o,r]),c=this.contractWrapper.parseLogs("PackUpdated",i==null?void 0:i.logs);if(c.length===0)throw new Error("PackUpdated event not found");const e=c[0].args.packId;return{id:e,receipt:i,data:()=>this.erc1155.get(e)}}async createTo(t,a){const r=await j(a.packMetadata,this.storage),n=ot.parse(a),{erc20Rewards:s,erc721Rewards:o,erc1155Rewards:i}=n,c={erc20Rewards:s,erc721Rewards:o,erc1155Rewards:i},{contents:e,numOfRewardUnits:l}=await this.toPackContentArgs(c),p=await this.contractWrapper.sendTransaction("createPack",[e,l,r,n.openStartTime,n.rewardsPerPack,t]),w=this.contractWrapper.parseLogs("PackCreated",p==null?void 0:p.logs);if(w.length===0)throw new Error("PackCreated event not found");const v=w[0].args.packId;return{id:v,receipt:p,data:()=>this.erc1155.get(v)}}async open(t){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;if(this._vrf)throw new Error("This contract is using Chainlink VRF, use `contract.vrf.open()` or `contract.vrf.openAndClaim()` instead");const r=await this.contractWrapper.sendTransaction("openPack",[t,a],{gasLimit:5e5}),n=this.contractWrapper.parseLogs("PackOpened",r==null?void 0:r.logs);if(n.length===0)throw new Error("PackOpened event not found");const s=n[0].args.rewardUnitsDistributed,o=[],i=[],c=[];for(const e of s)switch(e.tokenType){case 0:{const l=await g(this.contractWrapper.getProvider(),e.assetContract);o.push({contractAddress:e.assetContract,quantityPerReward:f(e.totalAmount,l.decimals).toString()});break}case 1:{i.push({contractAddress:e.assetContract,tokenId:e.tokenId.toString()});break}case 2:{c.push({contractAddress:e.assetContract,tokenId:e.tokenId.toString(),quantityPerReward:e.totalAmount.toString()});break}}return{erc20Rewards:o,erc721Rewards:i,erc1155Rewards:c}}async toPackContentArgs(t){const a=[],r=[],{erc20Rewards:n,erc721Rewards:s,erc1155Rewards:o}=t,i=this.contractWrapper.getProvider(),c=await this.contractWrapper.getSignerAddress();for(const e of n){const p=(await Q(i,e.quantityPerReward,e.contractAddress)).mul(e.totalRewards);if(!await Y(this.contractWrapper,e.contractAddress,p))throw new Error(`ERC20 token with contract address "${e.contractAddress}" does not have enough allowance to transfer.

You can set allowance to the multiwrap contract to transfer these tokens by running:

await sdk.getToken("${e.contractAddress}").setAllowance("${this.getAddress()}", ${p});

`);r.push(e.totalRewards),a.push({assetContract:e.contractAddress,tokenType:0,totalAmount:p,tokenId:0})}for(const e of s){if(!await A(this.contractWrapper.getProvider(),this.getAddress(),e.contractAddress,e.tokenId,c))throw new Error(`ERC721 token "${e.tokenId}" with contract address "${e.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getNFTCollection("${e.contractAddress}").setApprovalForToken("${this.getAddress()}", ${e.tokenId});

`);r.push("1"),a.push({assetContract:e.contractAddress,tokenType:1,totalAmount:1,tokenId:e.tokenId})}for(const e of o){if(!await A(this.contractWrapper.getProvider(),this.getAddress(),e.contractAddress,e.tokenId,c))throw new Error(`ERC1155 token "${e.tokenId}" with contract address "${e.contractAddress}" is not approved for transfer.

You can give approval the multiwrap contract to transfer this token by running:

await sdk.getEdition("${e.contractAddress}").setApprovalForAll("${this.getAddress()}", true);

`);r.push(e.totalRewards),a.push({assetContract:e.contractAddress,tokenType:2,totalAmount:h.from(e.quantityPerReward).mul(h.from(e.totalRewards)),tokenId:e.tokenId})}return{contents:a,numOfRewardUnits:r}}async call(t){for(var a=arguments.length,r=new Array(a>1?a-1:0),n=1;n<a;n++)r[n-1]=arguments[n];return this.contractWrapper.call(t,...r)}detectVrf(){if(G(this.contractWrapper,"PackVRF"))return new ct(this.contractWrapper.getSignerOrProvider(),this.contractWrapper.readContract.address,this.storage,this.contractWrapper.options,this.chainId)}}d(R,"contractRoles",["admin","minter","asset","transfer"]);export{R as Pack};
