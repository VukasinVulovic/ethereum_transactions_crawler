import dynamic from 'next/dynamic'

export default dynamic(() => import('./Bubble.js'), {
    ssr: false
});