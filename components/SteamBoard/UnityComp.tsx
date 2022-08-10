import { Unity, useUnityContext } from 'react-unity-webgl'
import { useEffect } from 'react'

const UnityComp = (): JSX.Element => {
  const buildUrl = '../../3d/Build'
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: buildUrl + '/SewangFactory.loader.js',
    dataUrl: buildUrl + '/SewangFactory.data',
    frameworkUrl: buildUrl + '/SewangFactory.framework.js',
    codeUrl: buildUrl + '/SewangFactory.wasm',
  })

  useEffect(() => {
    console.log(unityProvider)
  }, [unityProvider])

  return (
    <Unity
      unityProvider={unityProvider}
      className="unity"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default UnityComp
