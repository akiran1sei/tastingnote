"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/Contents.module.css";
import useReadGroups from "@/app/utils/useReadGroups";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";

export function GroupCreate(context) {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");

  const ReadGroups = useReadGroups();
  const [groupCreate, setGroupCreate] = useState("");
  const [groupChoice, setGroupChoice] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  const GroupData = [...ReadGroups];
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
      setUserName(session.user.name);
      setIsUserEmail(session.user.email);
      setIsLoading(false);
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);
  console.log(status);
  const options = [];
  GroupData.forEach((e, i, a) => {
    if (e.email.includes(isUserEmail)) {
      options.push(
        <option key={e._id} value={e._id}>
          {e.groupname}
        </option>
      );
    }
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!groupCreate || null) {
        return setError("空欄です、記入してください。");
      } else {
        setError(null);
        const response = await fetch(`/api/group/create`, {
          // cache: "no-store",
          method: "POST",
          body: JSON.stringify({
            groupname: groupCreate,
            email: isUserEmail,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        });
        const jsonData = await response.json();
        alert(jsonData.message);

        if (
          jsonData.message === "グループ作成成功" ||
          jsonData.message === "グループを追加しました。"
        ) {
          const res = await fetch(`/api/group/choice`, {
            // method: "GET",
            "Cache-Control": "no-store",
          });
          const Group = await res.json();
          router.refresh({ shallow: true });
          alert(Group.message);
          return window.location.reload();
        } else {
          return null;
        }
      }
    } catch (error) {
      return alert("グループ作成失敗");
    }
  };
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/group/delete/${groupChoice}`, {
      method: "DELETE",
      body: JSON.stringify({ _id: groupChoice, email: isUserEmail }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    const jsonData = await response.json();

    alert(jsonData.message);
    return window.location.reload();
  };
  if (isLoading) {
    return <LoadingSkeleton />;
  } else if (status === "unauthenticated") {
    return <Uncertified />;
  } else {
    return (
      <>
        <div className={styles.group_page}>
          <h1 className={styles.group_title}>Group</h1>
          <div className={styles.group_wrap}>
            <p className={styles.group_txt}>
              グループ作成を行ってください。
              <br />
              ここでは、グループ作成/削除を行います。
              <br />
              既存のグループを使用する場合は、
              <br />
              「NewPage」より進んでください。
            </p>
            <div className={styles.group_card}>
              <ul className={styles.group_form_list}>
                <p className={styles.group_txt}>
                  こちらは、グループ作成になります。
                </p>
                <li className={styles.group_form_item}>
                  <form onSubmit={handleCreateSubmit}>
                    <h2 className={styles.group_form_title}>
                      <label htmlFor="group-delete">Group Crate</label>
                    </h2>
                    <input
                      name="group_create"
                      id="group_create"
                      type="text"
                      value={groupCreate}
                      onChange={(e) => setGroupCreate(e.target.value)}
                      required
                    />
                    <div className={styles.group_error_txt}>
                      {error && (
                        <span onChange={(e) => setError(e.target.value)}>
                          {error}
                        </span>
                      )}
                    </div>
                    <button type="submit" className={styles.group_create_btn}>
                      CREATE
                    </button>
                  </form>
                </li>
                <li className={styles.group_form_item}>
                  <form onSubmit={handleDeleteSubmit}>
                    <div className={styles.edit_item_value_box}>
                      <h2 className={styles.group_form_title}>
                        <label htmlFor="group-delete">Group Delete</label>
                      </h2>
                      <select
                        name="group-delete"
                        id="group-delete"
                        value={groupChoice}
                        onChange={(e) => setGroupChoice(e.target.value)}
                        required
                      >
                        <option></option>
                        {options}
                      </select>
                      <button className={styles.group_delete_btn}>
                        Delete
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
              <button
                className={styles.group_next_btn}
                onClick={() => navigateTo("/pages/create/beans")}
              >
                New Page
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
