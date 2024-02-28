import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Button } from 'antd';
import { fetchFile, tiktokVideoDownloader } from './api';

function App() {
  const [videoQuality, setVideoQuality] = useState(0);
  const [tiktokURL, setTiktokURL] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    tiktokURL !== '' ? setIsDisable(false) : setIsDisable(true);
  }, [tiktokURL])

  const handleDownload = async () => {
    setLoading(true);
    setError('')
    try {
      const response = await tiktokVideoDownloader(tiktokURL, videoQuality);
      fetchFile(response.data.play);
    } catch (e) {
      setError('Something went wrong!')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <video autoPlay muted loop id="myVideo" className='z-0'>
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className='wrapper relative z-50'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-3xl font-bold text-white">
            TIKTOK VIDEO DOWNLOADER
          </h1>
          <p className="text-2xl text-white mt-5 font-bold">Without Watermark</p>
          <div className='flex flex-col justify-center items-center'>
            <div className='min-w-[250px] max-w-[400px] h-[50px] bg-white relative rounded-[8px] pl-[40px] pr-[20px] mt-8'>
              <SearchOutlined className='absolute text-[#c0bcbc] text-[24px] top-[50%] left-[10px] -translate-y-[50%]' />
              <input
                type='text'
                placeholder='Enter Tiktok URL'
                className='w-full h-full outline-none border-none bg-transparent'
                value={tiktokURL}
                onChange={(e) => {
                  setTiktokURL(e.target.value)
                }}
              />
            </div>
            <p className='text-[#F76045] font-bold'>{error}</p>
          </div>
          <div className='flex items-center mt-5 gap-2'>
            <p className='text-white text-sm font-bold'>Video quality: </p>
            <div className='flex justify-center items-center cursor-pointer'>
              <input
                type='radio'
                id='normal-checkbox'
                name='quality-video'
                className='cursor-pointer'
                onChange={() => {
                  setVideoQuality(0)
                }}
                defaultChecked
              />
              <label
                className='text-white text-sm font-bold cursor-pointer'
                htmlFor='normal-checkbox'
              >
                Normal
              </label>
            </div>
            <div className='flex justify-center items-center '>
              <input
                type='radio'
                id='hd-checkbox'
                name='quality-video'
                className='cursor-pointer'
                onChange={() => {
                  setVideoQuality(1)
                }}
              />
              <label
                className='text-white text-sm font-bold cursor-pointer'
                htmlFor='hd-checkbox'
              >
                HD
              </label>
            </div>
          </div>
          <Button
            type="primary"
            loading={loading}
            disabled={isDisable}
            icon={<DownloadOutlined />}
            size={'large'}
            style={{ color: 'white' }}
            className='bg-[#1677FF] mt-5 text-white'
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
