import * as React from 'react';
import { useState } from "react";

import { IGTGame } from './components/IGTGame';

export const App = () => {
    const [initialValues, setInitialValues] = useState();
    return <IGTGame/>;
};
