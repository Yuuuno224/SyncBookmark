// src/utils/gistService.ts
import ky from 'ky';

export interface GistFile {
  content: string;
  filename?: string;
  type?: string;
  language?: string;
  truncated?: boolean;
  size?: number;
}

export interface Gist {
  id?: string;
  description?: string;
  public: boolean;
  files: {
    [filename: string]: GistFile;
  };
  html_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GistResponse {
  id: string;
  description: string;
  public: boolean;
  files: {
    [filename: string]: GistFile;
  };
  html_url: string;
  created_at: string;
  updated_at: string;
}

class GistService {
  private baseURL = 'https://api.github.com';
  private token: string | null = null;
  private kyInstance: typeof ky;

  constructor(token?: string) {
    this.token = token || null;
    this.kyInstance = ky.extend({
      prefixUrl: this.baseURL,
      timeout: 10000,
      hooks: {
        beforeRequest: [
          (request) => {
            if (this.token) {
              request.headers.set('Authorization', `token ${this.token}`);
            }
            request.headers.set('Accept', 'application/vnd.github.v3+json');
          }
        ]
      }
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  // 创建 Gist
  async createGist(gist: Gist): Promise<GistResponse> {
    try {
      return await this.kyInstance.post('gists', {
        json: gist
      }).json<GistResponse>();
    } catch (error) {
      console.error('创建 Gist 失败:', error);
      throw new Error(`创建 Gist 失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  // 获取 Gist
  async getGist(gistId: string): Promise<GistResponse> {
    try {
      return await this.kyInstance.get(`gists/${gistId}`).json<GistResponse>();
    } catch (error) {
      console.error('获取 Gist 失败:', error);
      throw new Error(`获取 Gist 失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  // 更新 Gist
  async updateGist(gistId: string, gist: Partial<Gist>): Promise<GistResponse> {
    try {
      return await this.kyInstance.patch(`gists/${gistId}`, {
        json: gist
      }).json<GistResponse>();
    } catch (error) {
      console.error('更新 Gist 失败:', error);
      throw new Error(`更新 Gist 失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  // 删除 Gist
  async deleteGist(gistId: string): Promise<boolean> {
    try {
      await this.kyInstance.delete(`gists/${gistId}`);
      return true;
    } catch (error) {
      console.error('删除 Gist 失败:', error);
      throw new Error(`删除 Gist 失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  // 获取用户的所有 Gists
  async getUserGists(username?: string): Promise<GistResponse[]> {
    try {
      const url = username ? `users/${username}/gists` : 'gists';
      return await this.kyInstance.get(url).json<GistResponse[]>();
    } catch (error) {
      console.error('获取用户 Gists 失败:', error);
      throw new Error(`获取用户 Gists 失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  // 简化方法：创建或更新文本文件
  async saveTextFile(filename: string, content: string, description?: string, gistId?: string): Promise<GistResponse> {
    const gistData: Gist = {
      description: description || `File: ${filename}`,
      public: false,
      files: {
        [filename]: {
          content,
          filename
        }
      }
    };

    if (gistId) {
      return this.updateGist(gistId, gistData);
    } else {
      return this.createGist(gistData);
    }
  }

  // 从 Gist 文件获取文本内容
  async getTextFile(gistId: string, filename: string): Promise<string | null> {
    try {
      const gist = await this.getGist(gistId);
      const file = gist.files[filename];
      return file ? file.content : null;
    } catch (error) {
      console.error('获取文件内容失败:', error);
      return null;
    }
  }
}

// 创建单例实例
export const gistService = new GistService();