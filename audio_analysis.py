#!/usr/bin/env python
# coding: utf-8
from __future__ import unicode_literals
import librosa
from librosa import display
import matplotlib.pyplot as plt
import subprocess
import numpy
import youtube_dl
import warnings
warnings.filterwarnings('ignore')

class AudioAnalysis:

    def __init__(self, audio_file, video_file):
        self.audioPath = audio_file
        self.videoPath = video_file
        self.v_samples, self.v_sampling_rate = librosa.load(self.videoPath, sr=None, mono=True,
                                                  offset=0.0, duration=None)
        self.v_duration_of_sound = len(self.v_samples) / self.v_sampling_rate

        self.a_samples, self.a_sampling_rate = librosa.load(self.audioPath, sr= None, mono=True, offset = 0.0, duration = None)
        self.a_duration_of_sound = len(self.a_samples)/self.a_sampling_rate

        self.sample_time = self.a_duration_of_sound
        # number of points to scan cross correlation over
        self.span = 150
        # step size (in points) of cross correlation
        self.step = 1
        # minimum number of points that must overlap in cross correlation
        # exception is raised if this cannot be met
        self.min_overlap = 20
        # report match when cross correlation has a peak exceeding threshold
        self.threshold = 0.5
        self.max_offset = []
        #print(self.a_duration_of_sound, " seconds")

    def correlate_final(self, video_path):
        self.videoPath = video_path
        fingerprint_source = self.calculate_fingerprints(self.audioPath)
        fingerprint_target = self.calculate_fingerprints(self.videoPath)

        corr = self.compare(fingerprint_source, fingerprint_target, self.span, self.step)
        max_corr_offset = self.get_max_corr(corr, self.audioPath, self.videoPath)
        self.max_offset.append(abs(max_corr_offset))
        #return min(self.max_offset)

    def correlate(self):
        fingerprint_source = self.calculate_fingerprints(self.audioPath)
        fingerprint_target = self.calculate_fingerprints(self.videoPath)

        corr = self.compare(fingerprint_source, fingerprint_target, self.span, self.step)
        max_corr_offset = self.get_max_corr(corr, self.audioPath, self.videoPath)


    def calculate_fingerprints(self, filename):
        process = subprocess.Popen(['fpcalc', '-raw', '-length', self.sample_time, filename], shell=True)
        fpcalc_out, errs = process.communicate()
        #fpcalc_out = subprocess.getoutput('fpcalc -raw -length %i %s' % (self.sample_time, filename))
        # print(fpcalc_out)
        fingerprint_index = fpcalc_out.find('FINGERPRINT=') + 12
        fingerprints = list(map(int, fpcalc_out[fingerprint_index:].split(',')))

        return fingerprints

    def compare(self, listx, listy, span, step):
        if span > min(len(listx), len(listy)):
            # Error checking in main program should prevent us from ever being
            # able to get here.
            raise Exception('span >= sample size: %i >= %i\n'
                            % (span, min(len(listx), len(listy)))
                            + 'Reduce span, reduce crop or increase sample_time.')
        corr_xy = []
        for offset in numpy.arange(-span, span + 1, step):
            corr_xy.append(self.cross_correlation(listx, listy, offset))
        return corr_xy


    # return index of maximum value in list
    def max_index(self, listx):
      max_index = 0
      max_value = listx[0]
      for i, value in enumerate(listx):
          if value > max_value:
              max_value = value
              max_index = i
      return max_index

    def get_max_corr(self, corr, source, target):
      max_corr_index = self.max_index(corr)
      max_corr_offset = -self.span + max_corr_index * self.step
      print ("max_corr_index = ", max_corr_index, "max_corr_offset = ", max_corr_offset)
    # report matches
      if corr[max_corr_index] > self.threshold:
        print('%s and %s match with correlation of %.4f at offset %i'
               % (source, target, corr[max_corr_index], max_corr_offset))

      return max_corr_offset

    def correlation(self, listx, listy):
        if len(listx) == 0 or len(listy) == 0:
            # Error checking in main program should prevent us from ever being
            # able to get here.
            raise Exception('Empty lists cannot be correlated.')
        if len(listx) > len(listy):
            listx = listx[:len(listy)]
        elif len(listx) < len(listy):
            listy = listy[:len(listx)]

        covariance = 0
        for i in range(len(listx)):
            covariance += 32 - bin(listx[i] ^ listy[i]).count("1")
        covariance = covariance / float(len(listx))

        return covariance/32

    # return cross correlation, with listy offset from listx
    def cross_correlation(self, listx, listy, offset):
        if offset > 0:
            listx = listx[offset:]
            listy = listy[:len(listx)]
        elif offset < 0:
            offset = -offset
            listy = listy[offset:]
            listx = listx[:len(listy)]
        if min(len(listx), len(listy)) < self.min_overlap:
            # Error checking in main program should prevent us from ever being
            # able to get here.
            return
        #raise Exception('Overlap too small: %i' % min(len(listx), len(listy)))
        return self. correlation(listx, listy)

    def find_max_correlation(self):
        max_step = int(self.v_duration_of_sound - self.a_duration_of_sound)
        dict_ = {}
        #print(max_step)
        for i in range(max_step):
            # print(i, a_duration_of_sound+i)
            '''subprocess.getoutput("sox " + self.videoPath + " /root/audio_analysis/video/file_out" + str(
                i) + ".wav trim " + str(i) + " " + str(
                int(self.a_duration_of_sound)))'''

            process = subprocess.Popen(["sox", self.videoPath, "/root/audio_analysis/video/file_out", str(
                i) + ".wav trim " + str(i) + " " + str(
                int(self.a_duration_of_sound))])
            fpcalc_out, errs = process.communicate()
            dict_[i] = "file_out" + str(i) + ".wav"
        return dict_

    def correlation_find(self, val):
        for i in val:
            self.correlate_final("/root/audio_analysis/video/" + val[i])
            # print(i)

        if len(self.max_offset) > 0:
            i = self.max_offset.index(min(self.max_offset))

            if min(self.max_offset) == 0:
                if 1 in self.max_offset:
                    outlier = self.max_offset.index(1)
                    if outlier < i:
                        print("Video Shifted by " + str(outlier) + " seconds.")
                        return [outlier, outlier + self.a_duration_of_sound]
            else:
                print("Video Shifted by " + str(i) + " seconds.")
                return [i, i + self.a_duration_of_sound]

        #print(subprocess.getoutput("rm -rf /root/audio_analysis/audio_dir/*; rm -rf /root/audio_analysis/video/*; rm -rf /root/audio_analysis/video_dir/*"))

    def delete_dir(self):
        #print(subprocess.getoutput("rm -rf /root/audio_analysis/audio_dir/*; rm -rf /root/audio_analysis/video/*; rm -rf /root/audio_analysis/video_dir/*"))
        subprocess.Popen(['rm', '-rf', "/root/audio_analysis/audio_dir/*;",'rm', '-rf', '/root/audio_analysis/video/*;', 'rm', '-rf', '/root/audio_analysis/video_dir/*'])


class SpotubeDownload():

    def __init__(self, y_link, s_link):
        self.ylink = y_link
        self.slink = s_link

    def spotify_download(self):
        #print(subprocess.getoutput("cd audio_dir & spotdl --song " + self.slink + " -f D:/Documents/csc148/AudioAnalysis/audio_dir"))
        #print(subprocess.getoutput("cd /root/audio_analysis/audio_dir; spotdl --song " + self.slink + " -o flac -f /root/audio_analysis/audio_dir"))
        subprocess.Popen(['cd', '/root/audio_analysis/audio_dir;', 'spotdl', '--song', self.slink, '-o', 'flac', '-f', '/root/audio_analysis/audio_dir'])
        #print(subprocess.getoutput("cd audio_dir & for %a in (*.*) do ren \"%a\" \"audio.m4a\" & ffmpeg -i audio.m4a audio.wav"))
        #print(subprocess.getoutput("cd /root/audio_analysis/audio_dir; find . -type f -name *.flac -exec sh -c 'x=\"{}\"; mv \"$x\" \"audio.flac\"' \;"))
        subprocess.Popen(
            ['cd', '/root/audio_analysis/audio_dir;', 'find', '.',
             '-type', 'f', '-name', '*.flac', '-exec', 'sh', '-c', 'x=\"{}\"; mv \"$x\" \"audio.flac\"', '\;'])
        #print(subprocess.getoutput("cd /root/audio_analysis/audio_dir; ffmpeg -i audio.flac audio.wav"))
        subprocess.Popen(['cd', '/root/audio_analysis/audio_dir;', 'ffmpeg', '-i', 'audio.flac', 'audio.wav'])
        return "Done"

    def youtube_download(self):
        #print(self.ylink)
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
                'preferredquality': '192',
            }],
            'outtmpl': '/root/audio_analysis/video_dir/video.%(ext)s'
        }
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([self.ylink])

        return "done"


if __name__ == '__main__':

    path_1 = "https://www.youtube.com/watch?v=w2Ov5jzm3j8"
    path_2 = "https://open.spotify.com/track/0F7FA14euOIX8KcbEturGH?si=vGzh7hObTUWYsSHPD3aUdg"
    download = SpotubeDownload("https://www.youtube.com/watch?v=VpATBBRajP8", "https://open.spotify.com/track/5mpUKTdskZea0gStWzeHUZ?si=-C-OGfGWTFe7O_7PKE1WOg")
    #download = SpotubeDownload(path_1, path_2)
    download.youtube_download()
    download.spotify_download()
    audio = AudioAnalysis("/root/audio_analysis/audio_dir/audio.wav", "/root/audio_analysis/video_dir/video.wav")

    val = audio.find_max_correlation()
    print(val)

    print(audio.correlation_find(val))
    audio.delete_dir()





