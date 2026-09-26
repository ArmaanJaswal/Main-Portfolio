import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { portfolioData } from '../../data/portfolioData';
import { GitBranch, Star, ExternalLink, GitCommit, Users, FolderGit2, Flame, Sparkles } from 'lucide-react';

export default function GithubActivity() {
  const username = portfolioData.github.username || "ArmaanJaswal";
  const { featuredRepos } = portfolioData.github;

  const [profileData, setProfileData] = useState(null);
  const [totalContributions, setTotalContributions] = useState(null);
  const [liveRepos, setLiveRepos] = useState(featuredRepos || []);
  const [isLoading, setIsLoading] = useState(true);

  const customTheme = {
    dark: ['#141414', '#0e4429', '#006d32', '#26a641', '#39d353'],
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
  };

  // Fetch dynamic profile stats and live star/fork counts for selected featured repos
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      setIsLoading(true);
      try {
        // 1. Fetch public profile stats
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          if (isMounted) setProfileData(userData);
        }

        // 2. Fetch live contributions count from contributions API
        const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          if (contribData?.total?.lastYear !== undefined && isMounted) {
            setTotalContributions(contribData.total.lastYear);
          }
        }

        // 3. Live-enrich the curated featured repos with real star and fork counts from GitHub
        if (featuredRepos && featuredRepos.length > 0) {
          const enriched = await Promise.all(
            featuredRepos.map(async (repo) => {
              try {
                const repoRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}`);
                if (repoRes.ok) {
                  const repoData = await repoRes.json();
                  return {
                    ...repo,
                    stars: repoData.stargazers_count ?? repo.stars,
                    forks: repoData.forks_count ?? repo.forks,
                    description: repoData.description || repo.description,
                    language: repoData.language || repo.language
                  };
                }
              } catch (e) {
                // Ignore individual repo fetch failure and keep configured values
              }
              return repo;
            })
          );
          if (isMounted) setLiveRepos(enriched);
        }
      } catch (err) {
        console.warn("GitHub live sync active with fallback values", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchGitHubData();
    return () => { isMounted = false; };
  }, [username]);

  const rawStats = portfolioData.github.stats || [];

  const getStatIcon = (label) => {
    const l = (label || '').toUpperCase();
    if (l.includes('COMMIT') || l.includes('CONTRIBUTION')) return <GitCommit className="w-3.5 h-3.5 text-emerald-400" />;
    if (l.includes('REPO') || l.includes('PULL')) return <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />;
    if (l.includes('STAR') || l.includes('FOLLOWER')) return <Star className="w-3.5 h-3.5 text-purple-400" />;
    return <Flame className="w-3.5 h-3.5 text-orange-400" />;
  };

  const stats = rawStats.map((stat, idx) => {
    // If live total contributions fetched, enhance the first contribution/commit counter dynamically
    if (idx === 0 && totalContributions !== null) {
      return {
        ...stat,
        value: `${totalContributions.toLocaleString()}+`,
        icon: getStatIcon(stat.label)
      };
    }
    return {
      ...stat,
      icon: getStatIcon(stat.label)
    };
  });

  return (
    <section id="github" className="pt-12">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] pb-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
            GitHub Activity
          </h2>
          <span className="flex items-center gap-1.5 text-[10px] font-mono-code text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE API
          </span>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#888888] hover:text-white transition-colors"
        >
          <span>github.com/{username}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Dynamic GitHub Summary Stats Grid */}
      {stats.length > 0 && (
        <div className={`grid grid-cols-1 ${stats.length === 2 ? 'sm:grid-cols-2' : stats.length === 3 ? 'sm:grid-cols-3' : stats.length >= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-1'} gap-3 mb-4`}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-xl border border-[#1a1a1a] bg-[#0c0c0c] p-3.5 hover:border-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center justify-between text-[#666666] mb-1">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  {stat.label}
                </span>
                {stat.icon}
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono-code text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live GitHub Calendar with dynamic calculation */}
      <div className="rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-xs text-[#888888] font-mono-code">
          <span className="flex items-center gap-2 text-[#cccccc]">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Real-time Contribution Stream • @{username}</span>
          </span>
          <span className="text-emerald-400 font-semibold">
            {totalContributions !== null ? `${totalContributions} contributions in the last year` : "Fetching live data..."}
          </span>
        </div>

        {/* Dynamic Activity Calendar */}
        <div className="overflow-x-auto pb-2 scrollbar-thin flex justify-center min-h-[140px] items-center">
          <div className="w-full flex justify-center py-2 text-white">
            <GitHubCalendar
              username={username}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              theme={customTheme}
              colorScheme="dark"
              throwOnError={false}
              errorMessage={`Unable to fetch live contributions for @${username}.`}
            />
          </div>
        </div>
      </div>

      {/* Curated Selected Featured Repositories Only */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#777777] flex items-center gap-2">
            <span>SELECTED FEATURED REPOSITORIES</span>
            <span className="text-[10px] text-[#555555] font-normal">({liveRepos.length} curated)</span>
          </div>
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-mono-code text-[#666666] hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View all repos</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {liveRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url || `https://github.com/${username}/${repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col justify-between rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-4 hover:border-[#333333] hover:bg-[#121212] transition-all group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-mono-code text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span className="text-[#666666]">/</span> {repo.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#555555] group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-[#888888] leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-code text-[#777777] pt-3 mt-2 border-t border-[#161616]">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: repo.languageColor || (
                          repo.language === 'TypeScript' ? '#3178C6' :
                          repo.language === 'JavaScript' ? '#F7DF1E' :
                          repo.language === 'Go' ? '#00ADD8' :
                          repo.language === 'Python' ? '#3776AB' : '#38BDF8'
                        )
                      }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 hover:text-[#aaaaaa]">
                  <Star className="w-3.5 h-3.5" />
                  <span>{repo.stars ?? 0}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-[#aaaaaa]">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>{repo.forks ?? 0}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
