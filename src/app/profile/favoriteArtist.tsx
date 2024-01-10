'use client'
import { getArtistById } from '@/actions/artists/getartists'
import ProfilePicture from '@/components/ui/profilepicture'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const FavoriteArtist = ({id}:any) => {
    const [artist, setArtist] = useState<any>()

    useEffect(() => {
        const getArtist = async () => {
            const art:any = await getArtistById(id) 
            setArtist(art)
        }
        getArtist()
    },[id])
  return (
    <Link href={`/artists/${artist?.username}`}>
        <ProfilePicture className="w-[100px] h-[100px]" noBorder image={artist?.profilePicture} />
    </Link>
  )
}

export default FavoriteArtist