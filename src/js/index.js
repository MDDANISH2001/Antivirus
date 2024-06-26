import React from 'react';
import Status from './Status';
import ReactDOM from 'react-dom/client';
import {
    Route,
    Routes,
    HashRouter
} from "react-router-dom";
import Sidebar from './Sidebar';
import StartupOptimizer from './StartupOptimizer';
import ScannerInterface from './ScannerInterface';
import MainFrame from './MainFrame';
import Options from './Options';
import SSERenderer from './SSERenderer';
import ByteAvengerUndef from './ByteAvengerUndef';
import QuarantineHandler from './QuarantineHandler';
import { ipcRenderer } from 'electron';
window.React = React;

// const router = createHashRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<TestEle />}>
//             <Route path="dashboard" element={<Layout />} />
//         </Route>
//     )
// );
// TODO: upgrade to react router 6.4+ -> use createHashRouter and createRoutesFromElements
const root = ReactDOM.createRoot(document.getElementById("root"));

var handleNavEvent = (event) => {
    ipcRenderer.send(event);
}

root.render(
<>
    <HashRouter>
        <nav id="header">
            <div id="headerContent">
                ByteAvenger Antivirus⚡
            </div>
            <div id="header_actions">
                <span className="header_action" onClick={() => handleNavEvent('minimize')}>&minus;</span>
                <span className="header_action" onClick={() => handleNavEvent('close')}>&#10006;</span>
            </div>
        </nav>
        <div id="page">
            <div id="sideBar">
                <Sidebar />
            </div>
            <div id='content'>
                <Routes>
                    <Route path='/' element={<Status />} />
                    <Route path='/status' element={<Status />} />
                    <Route path="/mainFrame/:type" element={<MainFrame />} />
                    <Route path='/optimize' element={<StartupOptimizer />}></Route>
                    <Route path='/scanUI' element={<ScannerInterface />}></Route>
                    <Route path='/options' element={<Options/>}></Route>
                    <Route path='/sserenderer' element={<SSERenderer />}></Route>
                    <Route path='/manageQuars' element={<QuarantineHandler/>}></Route>
                    <Route path='*' element={<ByteAvengerUndef/>}></Route>
                </Routes>
            </div>
        </div>
    </HashRouter>
</>);