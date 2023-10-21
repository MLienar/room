import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Guitar } from './components/guitar.jsx'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        <Lights />

        <Guitar />

    </>
}